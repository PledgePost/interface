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
export function updateStatusColumn(
  currentRow: number,
  _recipientIndex: number,
  _status: any
) {
  const colIndex = (_recipientIndex % 64) * 4;

  // Clear the existing 4 bits for the recipient's status
  const newRow = currentRow & ~(0b1111 << colIndex);

  // Set the new 4 bits for the recipient's status
  const statusRow = newRow | (_status << colIndex);
  const applicationStatus = {
    index: _recipientIndex,
    statusRow: statusRow,
  };

  return applicationStatus;
}

export function decimalToBinary(decimalNumber: number): string {
  if (decimalNumber < 0 || !Number.isInteger(decimalNumber)) {
    throw new Error("Input must be a non-negative integer.");
  }

  if (decimalNumber === 0) {
    return "0";
  }

  let binaryString = "";
  while (decimalNumber > 0) {
    const remainder = decimalNumber % 2;
    binaryString = remainder.toString() + binaryString;
    decimalNumber = Math.floor(decimalNumber / 2);
  }

  return binaryString;
}
