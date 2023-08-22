/// <reference types="cypress"/>

import ProjectPomPage from '../page_objects/ProjectPomPage';

describe('Login Page Test Suite', ()=>{
    //calling my test data
    const testPage = new ProjectPomPage();

    let jsonData
    before(()=>{
        cy.fixture('data').then(function(data){
            jsonData = data;
        })
    })
    //opening of test url
    beforeEach(()=>{
        cy.visit(Cypress.env('appUrl'));
        //cy.viewport(window.screen.width, window.screen.height);
    })

    it("Verify Login, Choice selection and Build Now Button", ()=>{
        
        testPage.goToLoginForm();
        testPage.login(jsonData.username, jsonData.password);
        testPage.baseChoice();
        testPage.viewPortSize();
        testPage.featurePageValues();
        testPage.studioOnePackageValuesAndVerification();
    
        
       
    })
})