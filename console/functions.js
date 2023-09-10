
class functions{
    getArtists(arr){
        let artist = "( ";
        for(let i = 0; i < arr.length; i++){
            artist += arr[i].name + "| ";
        }
        artist += ") : ";

        return artist;
    }

    deviceExists(devices, device_name){
        let data = {
            "id": 0,
            "is_active": null
        };

        devices.forEach(element => {
            if(element.name.includes(device_name)){
                data.id = element.id;
                data.is_active = element.is_active;
                return element.id;
            }
        });

        return data;
    }
}

module.exports = new functions();