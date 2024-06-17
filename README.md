# check-valid-sequence-day

Check if a list of days in a CSV file is a valid sequence.

## Requirements

- Node.js (v12 or higher)
- npm (v6 or higher)

## Usage

1. Ensure your CSV file is in the same directory as the script and has the following format:

   ```csv
   day,record_count
   2024-06-27,41
   2024-06-17,41
   ```

2. Modify the constants `FILENAME`, `DAY_POSITION`, and `READ_FIRST_LINE` if necessary:

   - `FILENAME`: Name of the CSV file to read.
   - `DAY_POSITION`: Index of the date column in the CSV file.
   - `READ_FIRST_LINE`: Boolean indicating whether to read the first line (set to `true` if the CSV file includes headers).

3. Run the script using Node.js:

   ```sh
   node script.js
   ```

4. The script will output the missing days between the dates provided in the CSV file.
