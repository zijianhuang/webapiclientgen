"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var hero_1 = require("./hero");
var HeroDetailComponent = (function () {
    function HeroDetailComponent() {
    }
    return HeroDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", hero_1.Hero)
], HeroDetailComponent.prototype, "hero", void 0);
HeroDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-hero-detail',
        template: "\n    <div *ngIf=\"hero\">\n      <h2>{{hero.name}} details!</h2>\n      <div><label>id: </label>{{hero.id}}</div>\n      <div>\n        <label>name: </label>\n        <input [(ngModel)]=\"hero.name\" placeholder=\"name\"/>\n      </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [])
], HeroDetailComponent);
exports.HeroDetailComponent = HeroDetailComponent;
//# sourceMappingURL=hero-detail.component.js.map