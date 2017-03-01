"use strict";
var create_component_1 = require('./create.component');
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var http_1 = require("@angular/http");
describe('CreateTaskComponent', function () {
    var de;
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [create_component_1.CreateComponent],
            providers: [router_1.RouterOutletMap],
            imports: [testing_2.RouterTestingModule, common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(create_component_1.CreateComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
});
//# sourceMappingURL=create.component.spec.js.map