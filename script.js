// Main Script for Valentine's Day Surprise

document.addEventListener('DOMContentLoaded', () => {
    // Check for previous acceptance via Query Param OR LocalStorage
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get('skip') === 'true';

    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');

    if (introScreen && mainContent) {
        if (skipIntro) {
            // Skip intro immediately (only if via Back button)
            introScreen.style.display = 'none';
            mainContent.classList.add('visible');
            mainContent.style.display = 'block';

            // Initialize things that need visibility
            // Slider is now CSS only, no init needed
        } else {
            // Setup intro interaction
            setupIntroInteraction();
        }
    }

    // 1. Confetti
    // 2. Intersection Observer
    setupScrollAnimations();
   
        // Background audio: try autoplay, fallback to user interaction if blocked
        let bgAudio;

    // 3. Countdown (Index)
    if (document.getElementById('countdown')) {
        startCountdown();
    }

    // 4. Poem Reveal (Index)
    setupPoemReveal();

    // 5. Falling Hearts Background
    createFallingHearts();

    // --- Valentine Week Interactions ---
    // Rose Day
    const bloomBtn = document.getElementById('bloom-btn');
    if (bloomBtn) {
        bloomBtn.addEventListener('click', () => {
            document.querySelector('.virtual-rose').classList.remove('hidden-rose');
            document.querySelector('.message-card').classList.remove('hidden');
            document.querySelector('.message-card').classList.add('visible');
            bloomBtn.style.display = 'none';
            launchConfetti();
        });
    }

    // Propose Day
    const openPropBtn = document.getElementById('open-proposal');
    if (openPropBtn) {
        openPropBtn.addEventListener('click', () => {
            document.querySelector('.proposal-card').classList.add('flip');
            document.querySelector('.inner-proposal').classList.remove('hidden');
        });

        document.querySelectorAll('.btn-yes-propose, .btn-forever').forEach(btn => {
            btn.addEventListener('click', () => {
                alert("You just made me the happiest person alive! ❤️");
                launchConfetti();
            });
        });
    }

    // Chocolate Day
    const box = document.getElementById('chocolate-box');
    if (box) {
        box.addEventListener('click', () => {
            box.classList.add('open');
            document.getElementById('choco-msg').classList.add('visible');
            setTimeout(launchConfetti, 500);
        });
    }

    // Teddy Day
    const hugBtn = document.getElementById('hug-teddy');
    if (hugBtn) {
        hugBtn.addEventListener('click', () => {
            document.querySelector('.teddy').style.animation = 'bounce 0.5s infinite';
            document.getElementById('teddy-msg').classList.add('visible');
            launchConfetti();
            setTimeout(() => {
                document.querySelector('.teddy').style.animation = 'bounce 2s infinite';
            }, 2000);
        });
    }

    // Promise Day
    const signBtn = document.getElementById('sign-promise');
    if (signBtn) {
        signBtn.addEventListener('click', () => {
            document.getElementById('promise-sealed').classList.remove('hidden');
            launchConfetti();
            signBtn.innerText = "Signed Forever";
            signBtn.disabled = true;
        });
    }

    // Hug Day
    const sendHugBtn = document.getElementById('send-hug');
    if (sendHugBtn) {
        sendHugBtn.addEventListener('click', () => {
            document.body.classList.add('vibrate');
            document.getElementById('hug-msg').classList.add('visible');
            launchConfetti();
        });
    }
    
        try {
            bgAudio = document.createElement('audio');
            bgAudio.id = 'bg-music';
            bgAudio.src = 'audio/nepali-love.mp3'; // Place your MP3 at audio/nepali-love.mp3
            bgAudio.loop = true;
            bgAudio.preload = 'auto';
            bgAudio.volume = 0.6;
            bgAudio.setAttribute('playsinline', '');
            bgAudio.style.display = 'none';
            document.body.appendChild(bgAudio);

            const tryAutoPlay = () => {
                const playPromise = bgAudio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        const icon = document.getElementById('music-toggle')?.querySelector('i');
                        if (icon) icon.classList.replace('fa-play', 'fa-pause');
                        isPlaying = true;
                    }).catch(() => {
                        // Autoplay blocked — play on first user gesture
                        const onFirstGesture = () => {
                            bgAudio.play().then(() => {
                                const icon = document.getElementById('music-toggle')?.querySelector('i');
                                if (icon) icon.classList.replace('fa-play', 'fa-pause');
                                isPlaying = true;
                            }).catch(() => {});
                            document.removeEventListener('click', onFirstGesture);
                        };
                        document.addEventListener('click', onFirstGesture, { once: true });
                    });
                }
            };

            tryAutoPlay();
        } catch (e) {
            console.warn('Background audio setup failed:', e);
        }

    // Kiss Day
    const kissBtn = document.getElementById('send-kiss');
    if (kissBtn) {
        kissBtn.addEventListener('click', () => {
            document.getElementById('kiss-msg').classList.add('visible');
            createFlyingKisses();
        });
    }
});

// --- Date Locking Logic ---
const dayLinks = document.querySelectorAll('.day-link');
dayLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetDateStr = link.getAttribute('data-date'); // e.g., "02-07"
        if (!targetDateStr) return;

        const now = new Date();
        const year = now.getFullYear();
        const [month, day] = targetDateStr.split('-').map(Number);

        // Create target date object (Month is 0-indexed in JS)
        const targetDate = new Date(year, month - 1, day);
        // Set time to midnight for fair comparison
        targetDate.setHours(0, 0, 0, 0);

        // Current date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (today < targetDate) {
            e.preventDefault();
            showCustomModal("Wait for it!", `Have patience, my love! This surprise unlocks on Feb ${day}! ❤️🔒`);
        }
    });
});

// Custom Modal Logic
const modal = document.getElementById('custom-modal');
if (modal) {
    const closeBtn = modal.querySelector('.close-modal');
    const okBtn = document.getElementById('modal-ok');

    const closeModal = () => {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden'); // Ensure hidden class is re-added if logic relies on it? 
            // Actually my CSS uses opacity/visibility, so just removing .visible is enough.
            // But let's be safe per HTML structure which initialized as 'modal hidden'
            // The CSS 'modal' class doesn't use display:none, but 'hidden' class usually does.
            // Let's assume 'hidden' is display:none utility or just rely on CSS opacity.
            // Based on style.css provided: .modal.visible sets opa:1, vis:visible. 
            // .modal default is opa:0, vis:hidden.
        }, 300);
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (okBtn) okBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function showCustomModal(title, message) {
    const modal = document.getElementById('custom-modal');
    if (!modal) {
        alert(message); // Fallback
        return;
    }

    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-message').innerText = message;

    modal.classList.remove('hidden'); // Make sure it's layout-active
    // Small delay to allow transition
    requestAnimationFrame(() => {
        modal.classList.add('visible');
    });
}

// --- Intro Interaction Setup ---
function setupIntroInteraction() {
    const yesBtn = document.getElementById('btn-yes');
    const noBtn = document.getElementById('btn-no');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');

    if (!yesBtn) return;

    // YES Button Click
    yesBtn.addEventListener('click', () => {
        // Save state
        localStorage.setItem('valentineAccepted', 'true');

        // 1. Play Music
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
            isPlaying = true;
            document.getElementById('music-toggle').querySelector('i').classList.replace('fa-play', 'fa-pause');
        }

        // 2. Massive Confetti
        launchConfetti();

        // 3. Fade out intro, Fade in main
        introScreen.style.opacity = '0';
        introScreen.style.visibility = 'hidden';

        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.add('visible');
            mainContent.style.display = 'block';

            // Initialize things that need visibility
            // Slider is now CSS only, no init needed

        }, 1000);
    });

    // NO Button Interaction
    const moveNoButton = () => {
        const btnRect = noBtn.getBoundingClientRect();
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';

        const texts = ["Really?", "Think again!", "Please?", "No way!", "Catch me!"];
        noBtn.innerText = texts[Math.floor(Math.random() * texts.length)];
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
}

// --- Music Player Setup (YouTube API) ---
let player;
let isPlaying = false;
let bgAudio;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: '',
        playerVars: {
            'listType': 'playlist',
            'list': '5nMQqN5BQ-k?si=wwcaDs-_f-vCmFLm',
            'autoplay': 0,
            'loop': 1,
            'controls': 0,
            'showinfo': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(50);
    const toggleBtn = document.getElementById('music-toggle');
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');

        toggleBtn.addEventListener('click', () => {
            // Prefer local <audio> element if available
            if (typeof bgAudio !== 'undefined' && bgAudio) {
                if (!bgAudio.paused) {
                    bgAudio.pause();
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    isPlaying = false;
                } else {
                    bgAudio.play().catch(() => {});
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    isPlaying = true;
                }
                return;
            }

            if (!player || typeof player.getPlayerState !== 'function') return;

            const state = player.getPlayerState();
            if (state === 1) {
                player.pauseVideo();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                isPlaying = false;
            } else {
                player.playVideo();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                isPlaying = true;
            }
        });
    }
}


// --- Functions ---

function launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#e63946', '#ffccd5']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#e63946', '#ffccd5']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

function startCountdown() {
    // 2026-02-14T00:00:00+05:45
    const targetDate = new Date("2026-02-14T00:00:00+05:45").getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');
    const messageEl = document.getElementById('countdown-message');
    const countdownContainer = document.getElementById('countdown');

    const updateTimer = () => {
        if (!daysEl) return;

        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            if (countdownContainer) countdownContainer.style.display = 'none';
            if (messageEl) messageEl.classList.remove('hidden');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minsEl.innerText = String(minutes).padStart(2, '0');
        secsEl.innerText = String(seconds).padStart(2, '0');
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

function setupPoemReveal() {
    const btn = document.getElementById('reveal-btn');
    const content = document.getElementById('poem-content');

    if (!btn || !content) return;

    btn.addEventListener('click', () => {
        content.classList.remove('hidden');
        content.scrollIntoView({ behavior: 'smooth', block: 'start' });
        btn.innerHTML = 'Enjoy the Poem <i class="fas fa-book-open"></i>';

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    });
}

function createFallingHearts() {
    const container = document.getElementById('falling-hearts');
    if (!container) return; // Might not exist on all pages if not added

    const heartCount = 15;

    // Create function to spawn a heart
    const spawnHeart = () => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    };

    // Initial batch
    for (let i = 0; i < 10; i++) spawnHeart();

    // Constant flow
    setInterval(spawnHeart, 500);
}

function createFlyingKisses() {
    const container = document.getElementById('box') || document.body;
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const kiss = document.createElement('div');
            kiss.classList.add('kiss-mark');
            kiss.innerHTML = '💋';
            kiss.style.left = (Math.random() * 80 + 10) + 'vw';
            kiss.style.top = (Math.random() * 50 + 50) + 'vh';
            document.body.appendChild(kiss);
            setTimeout(() => kiss.remove(), 3000);
        }, i * 200);
    }
}
