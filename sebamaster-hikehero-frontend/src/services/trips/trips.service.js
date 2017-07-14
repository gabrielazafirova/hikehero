'use strict';


export default class TripsService {

    static get $inject(){
        return ['$http', 'API_URL'];
    }

    constructor($http,API_URL) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/trips/`;

    }

    static get name(){
        return 'tripsService';
    }

    upload(uploadUrl, data){
        var fd = new FormData();
        for(var key in data)
            fd.append(key, data[key]);
        //console.log(fd);
        //console.log(this.test);
        return this.$http.post(uploadUrl, fd, {
            transformRequest: angular.indentity,
            headers: { 'Content-Type': undefined }
        });
    }

    list() {

        let url = this.resourceUrl;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);

            });

        });

    }

    get(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }


    create(trip) {
        let url = this.resourceUrl;
        return this.$http.post(url,trip).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    delete(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.delete(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.status);
            });

        })
    }

    update(trip) {

        let url = `${ this.resourceUrl }${ trip['_id'] }`;
        return this.$http.put(url,trip).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    getQuestions(tripId) {
        let url = `${ this.resourceUrl }${ tripId }/questions`;
        return this.$http.get(url).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    postQuestion(tripId, question) {
        let url = `${ this.resourceUrl }${ tripId }/questions`;
        return this.$http.post(url, question).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    answerQuestion(tripId, questionId, answer) {
        let url = `${ this.resourceUrl }${ tripId }/questions/${ questionId }`;
        return this.$http.post(url, { "answer" : answer }).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    getBookings(tripId) {
        let url = `${ this.resourceUrl }${ tripId }/bookings`;
        return this.$http.get(url).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    postBooking(tripId, booking) {
        let url = `${ this.resourceUrl }${ tripId }/bookings`
        return this.$http.post(url, booking).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

}