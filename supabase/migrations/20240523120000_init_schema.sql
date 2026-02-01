SET search_path TO proj_000970f0;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Maps to auth.users.id
    full_name TEXT,
    email TEXT,
    phone_number TEXT,
    role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'courier', 'customer')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read/update their own profile
-- Using current_setting to get the authenticated user ID safely in shared environment
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile" ON profiles
    FOR SELECT USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- SHIPMENTS TABLE
CREATE TABLE IF NOT EXISTS shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_number TEXT UNIQUE NOT NULL,
    sender_id UUID NOT NULL, -- Maps to auth.users.id (user_id)
    recipient_name TEXT,
    recipient_email TEXT,
    recipient_phone TEXT,
    origin_address TEXT,
    destination_address TEXT,
    current_status TEXT DEFAULT 'pending' CHECK (current_status IN ('pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'returned')),
    estimated_delivery TIMESTAMPTZ,
    actual_delivery TIMESTAMPTZ,
    current_location JSONB, -- {lat: number, lng: number}
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shipments_tracking ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_sender ON shipments(sender_id);

ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Senders can CRUD their own shipments" ON shipments;
CREATE POLICY "Senders can CRUD their own shipments" ON shipments
    USING (sender_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Allow public read access if they have the exact tracking number (Simulated via application logic usually, but here strict RLS)
-- For now, we restrict to sender. Public tracking will likely use an Edge Function with Service Key to bypass RLS safely for specific lookups.

-- SHIPMENT EVENTS TABLE
CREATE TABLE IF NOT EXISTS shipment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    location TEXT,
    description TEXT,
    occurred_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_shipment ON shipment_events(shipment_id);

ALTER TABLE shipment_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Read access inherits from shipment" ON shipment_events;
CREATE POLICY "Read access inherits from shipment" ON shipment_events
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM shipments s
        WHERE s.id = shipment_events.shipment_id
        AND s.sender_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    ));

-- PROOF OF DELIVERY TABLE
CREATE TABLE IF NOT EXISTS proof_of_delivery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
    signature_url TEXT,
    signed_by TEXT,
    delivered_at TIMESTAMPTZ,
    delivery_location JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_pod_shipment UNIQUE (shipment_id)
);

ALTER TABLE proof_of_delivery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Read access inherits from shipment (POD)" ON proof_of_delivery;
CREATE POLICY "Read access inherits from shipment (POD)" ON proof_of_delivery
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM shipments s
        WHERE s.id = proof_of_delivery.shipment_id
        AND s.sender_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    ));
