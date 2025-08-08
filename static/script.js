const track = document.getElementById('carouselTrack');
const imagesCount = track.children.length;
const imageWidth = 1000; // must match CSS width
let currentIndex = 0;

function updateSlide() {
  track.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
}

// Auto slide every 3 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % imagesCount;
  updateSlide();
}, 2000);

const emojiList = ["🎁", "💫", "✨", "🎉", "🌟"];
const container = document.getElementById("floatingIcons");

for (let i = 0; i < 25; i++) {
  const emoji = document.createElement("span");
  emoji.classList.add("icon");
  emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];

  // Random position and size
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const size = 20 + Math.random() * 30;
  const duration = 3 + Math.random() * 4;

  // Apply styles
  emoji.style.position = "absolute"; // Make sure it's absolutely positioned
  emoji.style.left = `${x}px`;
  emoji.style.top = `${y}px`;
  emoji.style.fontSize = `${size}px`;
  emoji.style.animationDuration = `${duration}s`;

  container.appendChild(emoji);
}
function deleteWish(wishId) {
            if (confirm('Are you sure you want to delete this wish?')) {
                fetch('/delete_wish', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({wish_id: wishId})
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.querySelector(`[data-wish-id="${wishId}"]`).remove();
                    } else {
                        alert('Error deleting wish');
                    }
                });
            }
        }

        // File upload preview
        document.getElementById('photo').addEventListener('change', function(e) {
            const file = e.target.files[0];
            const label = document.querySelector('.file-upload-label span');
            
            if (file) {
                label.textContent = file.name;
                label.style.color = '#667eea';
            } else {
                label.textContent = 'Choose a photo or drag it here';
                label.style.color = '#666';
            }
        });
        function deleteWish(wishId) {
    console.log("Attempting to delete wish ID:", wishId);

    if (confirm('Are you sure you want to delete this wish?')) {
        fetch('/delete_wish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ wish_id: wishId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Server responded:", data);
            if (data.success) {
                alert("Wish deleted successfully!");
                location.reload();
            } else {
                alert("Delete failed: " + data.message);
            }
        })
        .catch(error => {
            console.error("Delete request failed:", error);
            alert("Something went wrong. Please try again.");
        });
    }
}
