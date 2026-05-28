export function calculateFare(pickupSuburb, destinationSuburb) {
  const baseFare = 8;
  const estimatedDistance = Math.max(
    5,
    pickupSuburb.length + destinationSuburb.length
  );

  const fare = baseFare + estimatedDistance * 1.8;

  return Number(fare.toFixed(2));
}