angular.module('app')
    .factory('cardFactory', function () {
        let service = {};
        let storedCards = JSON.parse(localStorage.getItem('cards'));
    
        let cards = (storedCards ? storedCards : []);
        
        
        service.getCards = function (list) {
            return _.filter(cards, {list_id : list.id});
        };
        
        service.createCard = function (list, cardDescription) {
            cards.push({
                id : _.uniqueId('card_'),
                description : cardDescription,
                list_id : list.id
            });
            updateLocalStorage(cards);
    
        };
        
        service.deleteCard = function (card) {
            return _.pull(cards, card)
    
        };
        
        service.updateCard = function (updatingCard) {
            let card = _.findWhere(cards, {id : updatingCard.id});
            card.description = updatingCard.description;
            card.list_id = updatingCard.list_id;
            updateLocalStorage(cards);
    
        };
    
        const updateLocalStorage = function (cards) {
            let sCards = JSON.stringify(cards);
            localStorage.setItem('cards', sCards);
        };
        
        return service;
    });