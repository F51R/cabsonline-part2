# CabsOnline Plus - Part 2 README

## 1. Public URL of the Deployed Application
Public URL: https://github.com/F51R/cabsonline-part2.git

## 2. Technology Stack Used
This project was developed using a modern React-based front-end stack.

Main technology stack:
- React
- Vite
- JavaScript
- Leaflet
- OpenStreetMap

Main libraries:
- react
- react-dom
- vite
- leaflet
- react-leaflet

Map provider:
The map feature uses OpenStreetMap tiles displayed through Leaflet and React Leaflet.

## 3. How to Run and Build the Project Locally
Install:
npm install

Run the development server:
npm run dev

## 4. Microservice API Endpoints Used
This project uses local mock API functions instead of a real remote backend server.

The mock API functions are located in:
src/data/mockBookings.js

Local mock API functions:
- getBookings()
  Retrieves all booking records from localStorage.
- saveBookings(bookings)
  Saves the updated booking list to localStorage.
- createBooking(newBooking)
  Creates a new taxi booking and generates a booking reference number.
- findBooking(reference)
  Searches for a booking by booking reference number.
- assignDriver(reference, driverName)
  Assigns a selected driver to a booking and changes the booking status to assigned.
- completeBooking(reference)
  Marks a booking as completed and updates the payment status.

There are no remote API endpoints used in this prototype.

## 5. Feature Descriptions
Feature 1: Smart Booking with Map Selection
The booking page allows customers to create a taxi booking. Instead of typing pickup and destination suburbs manually, the customer can select the pickup location and destination location directly from the interactive map.

The map allows the user to switch between selecting a pickup point and selecting a destination point. When both points are selected, markers are shown on the map and a route line is displayed between them.

The booking form also includes customer name, phone number, pickup date, pickup time, and payment method.

The system validates the booking before submission. It checks that required fields are completed, the phone number is valid, the pickup time is not in the past, and both map locations have been selected.

Feature 2: Fare and Distance Estimate
After the user selects pickup and destination locations on the map, the system calculates an estimated distance using the selected coordinates.

The system then calculates an estimated fare using a simple fare formula. This gives the customer a basic estimate before submitting the booking.

This feature improves the original Part 1 system because Part 1 only allowed text-based booking details. Part 2 provides a more modern and interactive booking experience.

Feature 3: Customer Tracking
The tracking page allows customers to search for their booking using a booking reference number such as BRN00001.

After searching, the system displays booking details, including customer name, route information, pickup date and time, booking status, assigned driver, estimated fare, and payment status.

This feature extends the original system by giving customers a monitoring service after they create a booking.

Feature 4: Driver Job Queue
The driver page allows drivers to view active taxi jobs.

Drivers can accept unassigned bookings. After a driver accepts a booking, the booking status changes to assigned.

Drivers can also mark assigned bookings as completed. When a ride is completed, the booking status changes to completed and the payment status is updated.

This feature extends the original system by adding driver-side functionality.

Feature 5: Admin Dashboard
The admin dashboard allows admin staff to view all bookings in a table.

Admin staff can select a driver and assign that driver to an unassigned booking. The system updates the booking status and displays the assigned driver.

The dashboard also supports unassigning bookings if needed. This gives admin staff better control over the booking workflow.

## 6. Testing Instructions
Test 1: Create a New Booking
1. Open the application.
2. Go to the Book tab.
3. Enter a customer name.
4. Enter a valid phone number with 10 to 12 digits.
5. Select a pickup date.
6. Select a pickup time that is not earlier than the current time.
7. Click Select Pickup.
8. Click a location on the map.
9. Click Select Destination.
10. Click another location on the map.
11. Check that two markers appear on the map.
12. Check that a route line appears between the two locations.
13. Check that the estimated distance and fare are displayed.
14. Click Submit Booking.
15. Copy the generated booking reference number.

Test 2: Track a Booking
1. Go to the Track tab.
2. Enter a booking reference number.
3. Click Track Booking.
4. Check that the booking details are displayed.

Example booking references:
- BRN00001
- BRN00002
- Use any new reference number generated after creating a booking.

Test 3: Assign a Driver as Admin
1. Go to the Admin tab.
2. Select a driver from the driver dropdown.
3. Find an unassigned booking.
4. Click Assign.
5. Check that the booking status changes to assigned.
6. Check that the selected driver is displayed in the booking row.

Sample driver IDs:
- D001 - Alex Driver
- D002 - Liam Brown
- D003 - Emma Wilson

Test 4: Driver Accepts or Completes a Job
1. Go to the Driver tab.
2. Find an unassigned or assigned booking.
3. If the booking is unassigned, click Accept as D001.
4. Check that the booking status changes to assigned.
5. If the booking is assigned, click Complete Ride.
6. Check that the booking status changes to completed.

Test 5: Validate Error Handling
1. Try submitting a booking without selecting a pickup location.
2. Try submitting a booking without selecting a destination location.
3. Try entering an invalid phone number.
4. Try selecting a pickup time in the past.
5. Confirm that the system displays an error message.

## 7. Limitations or Known Issues
Booking data is stored in browser localStorage. This means the data is only stored in the current browser. If the browser storage is cleared, the saved bookings will be removed.

The map selection uses latitude and longitude coordinates. It does not convert map coordinates into real street addresses. In a future version, reverse geocoding could be added to display real address names.

The route line on the map is a simple straight line between the pickup and destination points. It does not calculate the actual driving route. In a future version, a routing API such as OSRM, Google Maps Directions API, or OpenRouteService could be used.

Payment processing is simulated. The system does not connect to a real payment provider.

##8. Reflection on AI-Supported Development Process
AI was used to support the development of this Part 2 project. The original Part 1 system was based on PHP, MySQL, JavaScript, and HTML. For Part 2, AI helped plan how to refactor and extend the taxi booking system into a modern React application.

AI also helped generate and improve React components, including the booking form, tracking page, driver queue, admin dashboard, and map selection feature. During development, the generated code was reviewed and tested. Some parts were adjusted to better match the assignment requirements and to fix issues such as map display problems and CSS layout problems.
