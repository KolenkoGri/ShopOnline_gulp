const timeOfDiscount = document.querySelector('.gallery__text--timer');
timeOfDiscount.setAttribute('data-deadline', '2023/07/30 14:56');
const timeOutDiscount = timeOfDiscount.getAttribute('data-deadline');
const timeDescription = document.querySelector('.gallery__text--descrip');



const timer = (deadline) => {
    const timerBlockDays = document.querySelector('.gallery__big-figure--days');
    const timerBlockHours = document.querySelector('.gallery__big-figure--hours');
    const timerBlockMinutes = document.querySelector('.gallery__big-figure--minutes');
    const timerBlockSeconds = document.querySelector('.gallery__big-figure--seconds');
    timerBlockSeconds.style.display = 'none';

    const getTimeRemaining = () => {
        const option = {
            timeZone: 'Europe/Moscow',
        }
        const dateEnd = new Date(deadline).toLocaleString('ja', option);
        const dateStop = new Date(dateEnd).getTime();
        const dateNow = Date.now();      
        const timeRemaining = dateStop - dateNow;

        const seconds = Math.floor(timeRemaining / 1000 % 60);
        const minutes = Math.floor(timeRemaining / 1000 / 60 % 60 );
        const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
        const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24 % 30); 

        return {
            timeRemaining,
            seconds,
            minutes,
            hours,
            days,
        }
    }

    const start = () => {
        const timer = getTimeRemaining();
        let day = ' дней ';
        let hour = ' часов ';
        let minutes = ' минут ';
        let seconds = ' секунд ';

        if (timer.seconds % 10 === 1 && timer.seconds !== 11){
            seconds = ' секунда ';
        } else if (timer.seconds % 10 >= 2 && timer.seconds % 10 <= 4 ){
            seconds = ' секунды '
        }

        if (timer.days % 10 === 1 && timer.days !== 11){
            day = ' день ';
        } else if (timer.days % 10 >= 2 && timer.days % 10 <= 4 ){
            day = ' дня '
        }

        if (timer.hours % 10 === 1 && timer.hours !== 11){
            hour = ' час ';
        } else if (timer.hours % 10 >= 2 && timer.hours % 10 <= 4 ){
            hour = ' часа '
        }

        if (timer.minutes % 10 === 1 && timer.minutes !== 11){
            minutes = ' минута ';
        } else if (timer.minutes % 10 >= 2 && timer.minutes % 10 <= 4 ){
            minutes = ' минуты '
        }

        timerBlockDays.textContent = timer.days < 10 ? '0' + timer.days + day : timer.days + day;
        timerBlockHours.textContent = timer.hours < 10 ? "0" + timer.hours + hour : timer.hours  + hour;
        timerBlockMinutes.textContent = timer.minutes <10 ? '0' + timer.minutes + minutes : timer.minutes + minutes;
        timerBlockSeconds.textContent = timer.seconds <10 ? '0' + timer.seconds + seconds : timer.seconds + seconds;

        let intervalId = setInterval(start, 60000);

        if(timer.days === 0) {
            timerBlockSeconds.style.display = 'inline-block';
            timerBlockDays.style.display = 'none';
            intervalId = setInterval(start, 1000);
        }
        
        if(timer.timeRemaining <= 0) {
            clearTimeout(intervalId);
            timeOfDiscount.style.display = 'none';
            timeDescription.style.display = 'none';
            // Либо можно сделать через добавление класса 
        }

        const timerDays = timer.days;
        const timerHours = timer.hours;
        const timerMinutes = timer.minutes;
        const timerSeconds = timer.seconds;

        return {
            timerDays,
            timerHours,
            timerMinutes,
            timerSeconds,
            day,
            hour,
            minutes,
            seconds,
        }
    }

    start();

    // Плагин для таймера 

    const startTimerPlugin = () => {
        console.log('start');

        const {timerDays,
            timerHours,
            timerMinutes,
            timerSeconds,
            day,
            hour,
            minutes,
            seconds,} = start();
        
        const timerPlugin = document.querySelectorAll('[data-timer-deadline]');

        timerPlugin.forEach((t) => {
            t.insertAdjacentHTML('afterbegin', `
            <p class="gallery__text gallery__text--descrip"> До конца акции:</p>
            <p class="gallery__text gallery__text--timer"> 
                <span class="gallery__big-figure gallery__big-figure--days">${timerDays < 10 ? '0' + timerDays + day : timerDays + day}</span>
                <span class="gallery__big-figure gallery__big-figure--hours">${timerHours < 10 ? "0" + timerHours + hour : timerHours + hour}</span>
                <span class="gallery__big-figure gallery__big-figure--minutes">${timerMinutes <10 ? '0' + timerMinutes + minutes : timerMinutes + minutes}</span>
                <span class="gallery__big-figure gallery__big-figure--seconds">${timerSeconds <10 ? '0' + timerSeconds + seconds : timerSeconds + seconds}</span> 
            </p>
            `)
        })
    }

    const pluginInterval = setTimeout(startTimerPlugin, 1000);
};

timer(timeOutDiscount);


