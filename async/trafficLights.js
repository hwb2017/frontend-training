// 红灯3s亮一次，绿灯1s亮一次，黄灯2s亮一次，如何让3个等不断交替重复地亮呢

function red() {
    console.log('red');
}

function green() {
    console.log('green');
}

function yellow() {
    console.log('yellow');
}

function light(color) {
    return new Promise((resolve, reject) => {
        let duration;
        if (color === 'red') {
            red();
            duration = 3000;
        } else if (color === 'green') {
            green();
            duration = 1000;
        } else if (color === 'yellow') {
            yellow();
            duration = 2000;
        }
        setTimeout(resolve, duration)
    })
}

// function run() {
//     light('red').then(() => light('green')).then(() => light('yellow')).then(run)
// }

async function run() {
    while (true) {
        await light('red');
        await light('green');
        await light('yellow');
    }
}

run()