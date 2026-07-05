// import os from "os";

// console.log("🚀 Starting CPU + Memory Stress Test...");
// console.log("Press Ctrl + C to stop.\n");

// // =========================
// // CPU Stress
// // =========================

// const cpuCores = os.cpus().length;

// for (let i = 0; i < cpuCores; i++) {
//   setInterval(() => {
//     let result = 0;

//     for (let j = 0; j < 5e7; j++) {
//       result += Math.sqrt(j);
//     }
//   }, 0);
// }

// // =========================
// // Memory Stress
// // =========================

// const memoryBlocks = [];

// setInterval(() => {
//   // Allocate 50 MB every second
//   memoryBlocks.push(Buffer.alloc(50 * 1024 * 1024));

//   const rss = process.memoryUsage().rss / 1024 / 1024;

//   console.log(`RAM Used (Process): ${rss.toFixed(2)} MB`);
// }, 1000);









while (true) {
  Math.sqrt(Math.random());
}


// const blocks = [];

// console.log("Allocating 60 MB every second...");

// setInterval(() => {
//   blocks.push(new Array(7_500_000).fill(1));

//   const used = process.memoryUsage().heapUsed / 1024 / 1024;

//   console.log(`Heap Used: ${used.toFixed(2)} MB`);
// }, 1000);