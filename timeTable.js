const fs = require('fs');
const timeTable = require('./timeTable.json');
const presets = require('./slack_presets.json');

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getPreset = () => {
    const dateNow = new Date();
    const dayNow = dayNames[dateNow.getDay()];
    const table = timeTable[dayNow];

    let timeSegment = undefined;
    let endTime = undefined;

    if(table){
        for(let time of table){
            const start = new Date();
            const end = new Date();

            const startParts = time.start.split(':');
            const endParts = time.end.split(':');
            
            start.setHours(startParts[0]);
            end.setHours(endParts[0]);

            start.setMinutes(startParts[1]);
            end.setMinutes(endParts[1]);
            
            start.setSeconds(startParts[2]);
            end.setSeconds(endParts[2]);

            if(start.getTime() <= dateNow.getTime() && end.getTime() > dateNow.getTime()){
                timeSegment = time;
                endTime = end;
                break;
            }

        }
    }

    if(timeSegment){
        console.log(dateNow.toLocaleString(), `Currently running ${dayNow}`, timeSegment);
        return {
            preset: presets[timeSegment.preset],
            end: Math.floor(endTime.getTime()/1000)
        }
    }else{
        console.log("couldn't find any time segment not updating anything");
        return undefined;
    }
}

module.exports = {
    getPreset: getPreset,
} 