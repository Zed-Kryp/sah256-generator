async function generateHash() {
  const inputText = document.getElementById("inputText").value;
  const inputFile = document.getElementById("inputFile").files[0];
  let data;

  if (inputFile) {
    data = await readFileAsArrayBuffer(inputFile);
  } else {
    data = new TextEncoder().encode(inputText);
  }

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  document.getElementById("hashOutput").innerText = hashHex;
  document.getElementById("out").style.display = "block";
}

function hideOutput() {
  document.getElementById("out").style.display = "none";
}

function saveHash() {
  const hash = document.getElementById("hashOutput").innerText;
  const blob = new Blob([hash], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hash.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}
