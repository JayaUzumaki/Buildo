import PocketBase from "pocketbase";
import { Parser } from "json2csv";
import fs from "fs";

const BASE_URL = "http://127.0.0.1:8090";
const pb = new PocketBase(BASE_URL);

async function exportComponentsToCSV() {
  try {
    const data = await pb.collection("components").getFullList();
    if (!data || data.length === 0) {
      console.log("No data found in the components collection.");
      return;
    }

    const parser = new Parser();
    const csv = parser.parse(data);

    fs.writeFileSync("components.csv", csv);
    console.log("CSV file has been saved as components.csv!");
  } catch (error) {
    console.error("Error exporting components collection as CSV:", error);
  }
}

exportComponentsToCSV();
