let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.has_called_start = false;  // whether execute the start method or not
        this.timedelta = 0;  // The interval between the current frame and the last frame
        this.uuid = this.create_uuid();

        // console.log(this.uuid);
    }

    create_uuid() {
        let res = "";
        for(let i = 0; i < 8; i ++) {
            let x = parseInt(Math.floor(Math.random() * 10)); // return the number between [0,1)
            res += x;
        }
        return res;
    }

    start() { // execute on the first frame

    }

    update() { // execute on every frame

    }

    on_destroy() { // execute before destroyed

    }

    destroy() { // delete this object
        this.on_destroy();

        for (let i = 0; i < AC_GAME_OBJECTS.length; i ++) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp){

    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++) {
        let obj = AC_GAME_OBJECTS[i];
        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(AC_GAME_ANIMATION);
}


requestAnimationFrame(AC_GAME_ANIMATION);
