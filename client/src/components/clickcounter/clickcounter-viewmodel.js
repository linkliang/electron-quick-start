import ko from 'knockout'
export default class ClickCounterViewModel {
  constructor() {
  	this.numberOfClicks = ko.observable(0);
	  this.colors = ko.observableArray(['red','green','blue','black']);
 
    this.countClick = function() {
        this.numberOfClicks(this.numberOfClicks() + 1);
    };
 
    this.resetClicks = function() {
        this.numberOfClicks(0);
    };
	}
}