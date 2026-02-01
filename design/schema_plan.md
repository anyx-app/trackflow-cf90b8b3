# Schema Plan for TrackFlow

## Overview
TrackFlow requires a relational database to manage users (businesses), shipments, tracking events, and delivery proof. We will use Supabase (PostgreSQL).

## Tables

### 1. profiles
Public profile information for authenticated users (linking to `auth.users`).

- **id**: UUID (Primary Key, Foreign Key -> auth.users.id)
- **full_name**: Text
- **email**: Text
- **phone_number**: Text (For notifications)
- **role**: Text (Check constraint: 'admin', 'courier', 'customer') - Default 'customer'
- **avatar_url**: Text
- **created_at**: Timestamptz
- **updated_at**: Timestamptz

### 2. shipments
The core entity representing a package being tracked.

- **id**: UUID (Primary Key, default gen_random_uuid())
- **tracking_number**: Text (Unique, Indexed)
- **sender_id**: UUID (Foreign Key -> profiles.id)
- **recipient_name**: Text
- **recipient_email**: Text
- **recipient_phone**: Text
- **origin_address**: Text
- **destination_address**: Text
- **current_status**: Text (Check constraint: 'pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'returned')
- **estimated_delivery**: Timestamptz
- **actual_delivery**: Timestamptz
- **current_location**: JSONB (Stores {lat: number, lng: number} for map view)
- **created_at**: Timestamptz
- **updated_at**: Timestamptz

### 3. shipment_events
History log for timeline updates.

- **id**: UUID (Primary Key, default gen_random_uuid())
- **shipment_id**: UUID (Foreign Key -> shipments.id, ON DELETE CASCADE)
- **status**: Text (Matches shipment status or granular detail)
- **location**: Text (e.g., "Sort Facility, NY")
- **description**: Text (e.g., "Package processed")
- **occurred_at**: Timestamptz
- **created_at**: Timestamptz

### 4. proof_of_delivery
Stores delivery confirmation details including signatures.

- **id**: UUID (Primary Key, default gen_random_uuid())
- **shipment_id**: UUID (Foreign Key -> shipments.id, Unique constraint ensures 1 POD per shipment)
- **signature_url**: Text (Storage URL)
- **signed_by**: Text
- **delivered_at**: Timestamptz
- **delivery_location**: JSONB (Capture exact coordinates of delivery)
- **created_at**: Timestamptz

## Relationships

- `profiles` (1) -> (Many) `shipments` (as sender)
- `shipments` (1) -> (Many) `shipment_events`
- `shipments` (1) -> (0 or 1) `proof_of_delivery`

## Security (RLS) Policies

1. **profiles**:
   - Users can read/update their own profile.
   - Admins can read all profiles.

2. **shipments**:
   - Sender (owner) can CRUD their shipments.
   - Public read access via `tracking_number` (strictly scoped lookup, maybe via a secure function or RLS allowing access if tracking_number matches exact query, though generic RLS is harder for anonymous users without a precise token. For MVP, we might allow public read if they know the tracking UUID or tracking number via a specific view/function, or keep it open for read if known ID). 
   - *Refined Strategy*: Allow public read on `shipments` if the user provides the correct `tracking_number`. RLS: `true` (if we want public tracking pages) or restrict to `auth.uid() = sender_id` and use a separate Edge Function for public tracking lookup to avoid exposing the whole table.
   - For this plan: Sender has full access. Public (anon) has read access where `tracking_number` is provided (conceptual).

3. **shipment_events**:
   - Inherits read access from parent shipment.

4. **proof_of_delivery**:
   - Inherits read access from parent shipment.

## Indexes
- `shipments(tracking_number)`
- `shipments(sender_id)`
- `shipment_events(shipment_id)`
