const curtainLeft = document.getElementById('curtain-left');
    const curtainRight = document.getElementById('curtain-right');
    const revealButton = document.getElementById('revealButton');
    const content = document.getElementById('content');
    const stampImage = document.querySelector('#revealButton img');

    var tinderContainer = document.querySelector('.tinder');
    var tinderContainer1 = document.querySelector('.tinder1')
    var allCards = document.querySelectorAll('.tinder--card');
    var allCards1 = document.querySelectorAll('.tinder--card1');
    var nope = document.getElementById('nope');
    var love = document.getElementById('love');

    // Function to reset the Tinder-like swipe cards
    function resetCards() {
        const removedCards = document.querySelectorAll('.tinder--card.removed');
        removedCards.forEach((card) => {
            card.classList.remove('removed');
            card.style.transform = '';
        });
        initCards(); // Initialize the cards
    }

    function resetCards1() {
        const removedCards = document.querySelectorAll('.tinder--card1.removed');
        removedCards.forEach((card) => {
            card.classList.remove('removed');
            card.style.transform = '';
        });
        initCards(); // Initialize the cards
    }

    // Event listener for the "reset" button
    document.getElementById('resetButton').addEventListener('click', resetCards);
    document.getElementById('resetButton1').addEventListener('click',resetCards1);

    revealButton.addEventListener('click', () => {
        curtainLeft.style.transform = 'translateX(-100%)';
        curtainRight.style.transform = 'translateX(100%)';
        stampImage.style.display = 'none'; // Hide the stamp image

        setTimeout(() => {
            curtainLeft.style.display = 'none';
            curtainRight.style.display = 'none';
            content.style.display = 'block';
        }, 1000); // Adjust the duration (in milliseconds) of the animation
    });


    revealButton.addEventListener('click', () => {
    curtainLeft.style.transform = 'translateX(-100%)';
    curtainRight.style.transform = 'translateX(100%)';
    stampImage.style.display = 'none'; // Hide the stamp image

    
    

    setTimeout(() => {
        curtainLeft.style.display = 'none';
        curtainRight.style.display = 'none';
        content.style.display = 'block';

        // Play the audio
        const audio = document.getElementById('audio');
        audio.play();
        }, 1000); // Adjust the duration (in milliseconds) of the animation
    
    });

    // Set the date we're counting down to
    const weddingDate = new Date('December 21, 2023 07:30:00').getTime();

    // Update the countdown every 1 second
    const countdown = setInterval(function () {
    // Get the current date and time
    const currentDate = new Date().getTime();

    // Calculate the time remaining in milliseconds
    const timeRemaining = weddingDate - currentDate;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the countdown timer
    const countdownTimer = document.getElementById('countdown-timer');
    countdownTimer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If the countdown is over, display a message
    if (timeRemaining <= 0) {
        clearInterval(countdown);
        countdownTimer.innerHTML = 'The wedding is here! #SanAmthosava is happening';
        }
    }, 1000); // Update every 1 second

    // Existing JavaScript code ...

// Add the following code for Tinder-like swipe cards
    

    function initCards(card, index) {
    var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
    var newCards1 = document.querySelectorAll('.tinder--card1:not(.removed)');
    newCards.forEach(function (card, index) {
        card.style.zIndex = allCards.length - index;
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
        card.style.opacity = (10 - index) / 10;
    });
    newCards1.forEach(function (card, index) {
        card.style.zIndex = allCards1.length - index;
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
        card.style.opacity = (10 - index) / 10;
    });

    tinderContainer.classList.add('loaded');
    tinderContainer1.classList.add('loaded');
    }

    initCards();

    allCards.forEach(function (el) {
    var hammertime = new Hammer(el);

    hammertime.on('pan', function (event) {
        el.classList.add('moving');
    });

    hammertime.on('pan', function (event) {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;

        tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
        tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });

    hammertime.on('panend', function (event) {
        el.classList.remove('moving');
        tinderContainer.classList.remove('tinder_love');
        tinderContainer.classList.remove('tinder_nope');

        var moveOutWidth = document.body.clientWidth;
        var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        event.target.classList.toggle('removed', !keep);

        if (keep) {
        event.target.style.transform = '';
        } else {
        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        initCards();
        }
    });
    });

    allCards1.forEach(function (el) {
        var hammertime = new Hammer(el);
    
        hammertime.on('pan', function (event) {
            el.classList.add('moving');
        });
    
        hammertime.on('pan', function (event) {
            if (event.deltaX === 0) return;
            if (event.center.x === 0 && event.center.y === 0) return;
    
            tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
            tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);
    
            var xMulti = event.deltaX * 0.03;
            var yMulti = event.deltaY / 80;
            var rotate = xMulti * yMulti;
    
            event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
        });
    
        hammertime.on('panend', function (event) {
            el.classList.remove('moving');
            tinderContainer.classList.remove('tinder_love');
            tinderContainer.classList.remove('tinder_nope');
    
            var moveOutWidth = document.body.clientWidth;
            var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    
            event.target.classList.toggle('removed', !keep);
    
            if (keep) {
            event.target.style.transform = '';
            } else {
            var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            var toX = event.deltaX > 0 ? endX : -endX;
            var endY = Math.abs(event.velocityY) * moveOutWidth;
            var toY = event.deltaY > 0 ? endY : -endY;
            var xMulti = event.deltaX * 0.03;
            var yMulti = event.deltaY / 80;
            var rotate = xMulti * yMulti;
    
            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
            initCards();
            }
        });
        });

    function createButtonListener(love) {
    return function (event) {
        var cards = document.querySelectorAll('.tinder--card:not(.removed)');
        var moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;

        var card = cards[0];

        card.classList.add('removed');

        if (love) {
        card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
        } else {
        card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
        }

        initCards();

        event.preventDefault();
    };
    }

    var nopeListener = createButtonListener(false);
    var loveListener = createButtonListener(true);

    nope.addEventListener('click', nopeListener);
    love.addEventListener('click', loveListener);


    window.addEventListener("load", function () {
        const video = document.getElementById("eventVideo");
      
        // Play the video when the page is loaded
        video.play();
      });