document.addEventListener("DOMContentLoaded", function () {
  // Like Icon Handling
  const likeIcons = document.querySelectorAll(".fa-regular.fa-heart");
  const likesDisplay = document.querySelector("#heart-btn .counter");

  let likesTotal = 0;

  likeIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      // Bump up the like tally
      likesTotal++;

      // Refresh the like tally shown in the header
      likesDisplay.textContent = likesTotal;

      // Switch the icon style to filled heart
      this.classList.add("fa-solid");
      this.classList.remove("fa-regular");
    });
  });

  // Duplicate Button Handling
  const duplicateBtns = document.querySelectorAll(".card button"); // Grab buttons within each card
  const dupesTracker = document.querySelector("#copy-btn .counter"); // Tracker for duplicates in the top bar
  let dupesTotal = parseInt(dupesTracker?.textContent) || 0; // Pull initial duplicate count from top bar, or start at zero

  duplicateBtns.forEach((btn) => {
    if (
      btn.querySelector("i") &&
      btn.querySelector("i").classList.contains("fa-copy")
    ) {
      // Verify the button has a duplicate icon
      btn.addEventListener("click", function () {
        // Extract the contact ID from the parent card
        const parentCard = this.closest(".card"); // Locate the enclosing card
        const contactId = parentCard.querySelector(".service-nmbr").textContent; // Pull the contact ID text

        
        const tempBox = document.createElement("input");
        tempBox.value = contactId; // Load the contact ID into the box
        document.body.appendChild(tempBox); // Add it temporarily to the page

        // Highlight the content in the box
        tempBox.select();
        tempBox.setSelectionRange(0, 99999); // Handles selection on touch devices

        // Trigger the duplicate action
        document.execCommand("copy");

        // Clean up the short-lived box
        document.body.removeChild(tempBox);

        // Display confirmation message for the user
        alert(`Duplicated contact ID: ${contactId}`);

        // Advance the duplicate tracker in the top bar
        dupesTotal++;
        dupesTracker.textContent = dupesTotal; // Refresh the duplicate tally in the top bar
      });
    }
  });

  // Contact Button Handling
  const contactBtns = document.querySelectorAll(".call-btn"); // All contact buttons across cards
  const tokensDisplay = document.querySelector("#coin-btn .counter"); // Tokens tally in the top bar
  const logContainer = document.getElementById("history-items"); // Holder for log entries

  let tokensAvailable = parseInt(tokensDisplay?.textContent) || 100; // Starting tokens from top bar, or 100 by default

  contactBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Retrieve contact details from the button's card
      const parentCard = this.closest(".card"); // Identify the surrounding card
      const contactLabel = parentCard.querySelector("h3").textContent; // Fetch the contact label
      const contactId = parentCard.querySelector(".service-nmbr").textContent; // Fetch the contact ID

      // Verify sufficient tokens for contact
      if (tokensAvailable < 20) {
        alert("Insufficient tokens for this contact.");
        return; // Stop execution if tokens are too low
      }

      // Deduct 20 tokens
      tokensAvailable -= 20;
      tokensDisplay.textContent = tokensAvailable; // Update tokens in the top bar

      // Notify user of the contact attempt
      alert(`Contacting ${contactLabel} via ${contactId}`);

      // Capture the present moment
      let timestamp = new Date();
      let formattedTime = timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }); 

      // Append contact details and timestamp to the log area
        if (logContainer) {
          const logEntry = document.createElement("div");
          logEntry.className = "log-entry mb-2 bg-[#FAFAFA] p-3 rounded-lg"; // Add a class for styling as needed (e.g., white background, padding, border-radius)

        const entryHeader = document.createElement("div");
        entryHeader.className = "entry-header"; // Flexbox for label and time side-by-side
        entryHeader.style.display = "flex";
        entryHeader.style.justifyContent = "space-between";
        entryHeader.style.alignItems = "center";

        const contactLabelSpan = document.createElement("span");
        contactLabelSpan.className = "contact-label font-inter ";
        contactLabelSpan.style.fontWeight = "600"; // Semi-bold
        contactLabelSpan.textContent = contactLabel;

        const timeSpan = document.createElement("span");
        timeSpan.className = "time";
        timeSpan.textContent = formattedTime;

        entryHeader.appendChild(contactLabelSpan);
        entryHeader.appendChild(timeSpan);

        const contactNumberDiv = document.createElement("div");
        contactNumberDiv.className = "contact-number";
        contactNumberDiv.style.color = "#5C5C5C";
        contactNumberDiv.textContent = contactId;

        logEntry.appendChild(entryHeader);
        logEntry.appendChild(contactNumberDiv);
        logContainer.appendChild(logEntry);
      }
    });
  });

  // Reset Button Handling for log clearing
  const resetBtn = document.querySelector("#call-history button"); // Locate the "Reset" button

  if (resetBtn && logContainer) {
    // Proceed only if elements are present
    resetBtn.addEventListener("click", function () {
      // Wipe out all log entries (paragraph elements) from the container
      logContainer.innerHTML = "";

      alert("Log has been reset!");
    });
  }
});
