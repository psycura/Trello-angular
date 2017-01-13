angular.module('app')
    .factory('listFactory', function () {
        let service = {};
        let storedLists = JSON.parse(localStorage.getItem('lists'));
        
        let lists = (storedLists ? storedLists : []);
        
        service.getLists = function () {
            return lists;
        };
        service.addList = function (listName) {
            lists.push({
                id : _.uniqueId('list_'),
                listName : listName
            });
            updateLocalStorage(lists);
        };
        service.removeList = function (list) {
            _.pull(lists, list);
            updateLocalStorage(lists);
            
        };
        
        const updateLocalStorage = function (lists) {
            let sLists = JSON.stringify(lists);
            localStorage.setItem('lists', sLists);
        };
        return service;
    });