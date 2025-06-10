
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("playlist-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalCreator = document.getElementById("modal-creator");
    const modalDetails = document.getElementById("modal-details");
    const closeBtn = document.querySelector(".close-button");

    // Example: Add click event to all cards
    document.querySelectorAll(".playlist-card").forEach((card, index) => {
        card.addEventListener("click", () => {
            // You can customize this logic to load real data
            modalTitle.textContent = `Playlist Title ${index + 1}`;
            modalCreator.textContent = `Creator ${index + 1}`;
            modalDetails.textContent = `This playlist includes 12 songs in various genres.`;

            modal.style.display = "block";
        });
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
