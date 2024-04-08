// Log events flag
let logEvents = false;

//Log all flag
let logAll = false;

// Logging/debugging functions
function enableLog(ev) {
  logEvents = !logEvents;
}

function log(prefix, ev) {
  if (!logEvents) return;
  const o = document.getElementById("output");
  const s =
    `${prefix}:<br>` +
    `  pointerID   = ${ev.pointerId}\n` +
    `  pointerType = ${ev.pointerType}\n` +
    `  isPrimary   = ${ev.isPrimary}`;
  console.log(`${s}`);
}

function logAllEvents() {
  if (!logAll) return;
  //CB: Some fun code to track **all** events happening in the window.
  //Useful for seeing exactly what type of event you want to track!
  Object.keys(window).forEach((key) => {
    if (/^on/.test(key)) {
      window.addEventListener(key.slice(2), (e) => {
        log(key.slice(2), e);
      });
    }
  });
}

export { log, logAllEvents };
