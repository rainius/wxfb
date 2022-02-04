//上面的水管

import { Sprite } from "../base/Sprite";
import { Pipe } from "./Pipe";

export class UpPipe extends Pipe {
    constructor(top) {
        const image = Sprite.getImage('pipeUp');
        super(image, top)
    }
}