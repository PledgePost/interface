export function buildStatusRow(recipientIndex: number, newStatus: number) {
  // calculate col index on bitmap
  const colIndex = (recipientIndex % 64) * 4;

  // initial row
  let currentRow = 0;

  // create a new row
  let newRow = currentRow & ~(15 << colIndex);

  // set specified status at specified position
  let statusRow = newRow | (newStatus << colIndex);

  // Initialize ApplicationStatus object
  const applicationStatus = {
    index: recipientIndex,
    statusRow: statusRow,
  };

  return applicationStatus;
}
