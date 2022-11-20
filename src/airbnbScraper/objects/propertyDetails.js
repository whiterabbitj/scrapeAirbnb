class RoomDetails{
    constructor(){
        this.numbGuest = 0;
        this.numbBedrooms = 0;
        this.numbBeds = 0;
        this.numbBathrooms = 0;
    }
}

class AmenitiesDetail {
    constructor(amenity,amenityDescription ) {
        this.amenity = amenity;
        this.amenityDescription = amenityDescription;
    }
}

class PropertyDetails {
    constructor() {
        this.propertyName = '';
        this.propertyType = '';
        this.url = '';
        this.amenityDetail = [];
        this.roomDetail = new RoomDetails();
    }
}
module.exports = {PropertyDetails, AmenitiesDetail};
