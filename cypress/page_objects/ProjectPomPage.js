
class ProjectPomPage{
      //Locators
      chooseBaseBtn = '.builderNowCta'
      cancelIconNatashaChat = '.topPart > .closeButton > .icon-cancel'

      //Login Locators
      signSignUpFormBtn = 'li > button'
      usernameTexbox = '#loginEmailInput'
      passwordTextbox = "//input[@type='password']"
      loginBtn = "//button[contains(text(),'Sign in')]"
      userProfileLable = '.userProfile'

      //Features Page Locators
      firstChoice = ':nth-child(1) > .templateCard > .header > .actionbx > .morebtn'
      buildNowBtn = '//div[@class="getStart"]'
      custCost = '.customizeCost > h3 > strong'
      fCost = '.reusableCost > h3 > strong'
      tCost = '.maxpriceBox > h3 > strong'
      drt = '.durationBox > h3 > strong'
      planDelivery = '//button[normalize-space()="Plan Delivery"]'
       
      //Delivery Page Locators
      dlv_custCost = '.customizeCost > h3 > strong'
      dlv_fCost = '.reusableCost > h3 > strong'
      dlv_tCost = '.maxpriceBox > h3 > strong'
      dlv_drt = '.durationBox > h3 > strong'
      studioOne = '//label[@for="builderCarePlus"]'

      //Studio One Paage Locators
      studioCustCost = '.customizeCost > h3 > strong'
      studioFCost = '.reusableCost > h3 > strong'
      studioCost = '.builder-care-wrap > strong'
      studioTCost = '.maxpriceBox > h3 > strong'
      studioDrt = '.durationBox > h3 > strong'
      
      doneBtn = '//button[normalize-space()="Done"]'
      buildCardName = '.popHolder > .ng-untouched'
      buildCardVal = '.popHolder > .ng-pristine'
      saveBtn = '//button[normalize-space()="Save"]'
      
      //BuildCard Page Locators
      studioCustCost = '.customizeCost > h3 > strong'
      studioFCost = '.reusableCost > h3 > strong'
      studioCost = '.builder-care-wrap > strong'
      studioTCost = '.maxpriceBox > h3 > strong'
      studioDrt = '.durationBox > h3 > strong'

      //Payment Summary Page Locators
      pmtCustCost = '.costDuration > :nth-child(1) > p > strong'
      pmtFCost = ':nth-child(2) > p > strong'
      pmtStudioCost = '.careContentRow > p > strong'
      pmtTCost = '.detailRow > .ng-star-inserted > strong'
      pmtDrt = ':nth-child(5) > .boldText'

      //Steps
      goToLoginForm() {
          cy.get(this.chooseBaseBtn).click()
          cy.get(this.cancelIconNatashaChat).click()
          cy.get(this.signSignUpFormBtn).click()
  
      }
      login(username, password) {
          cy.get(this.usernameTexbox).type(username)
          cy.xpath(this.passwordTextbox).type(password)
          cy.xpath(this.loginBtn).click()
          cy.get(this.userProfileLable).should('be.visible')
      }

      baseChoice(){
        cy.get(this.firstChoice).click()
        cy.xpath(this.buildNowBtn).click()
      }
    
      featurePageValues(){
        cy.wait(20000)
        var planVals = []
        var deliveryVals = []
        //extracting and storing feature values in an array
        cy.get(this.custCost).invoke('text').as('customizedCost').then(function(){
            planVals.push(this.customizedCost)
        })
        cy.get(this.fCost).invoke('text').as('fixedCost').then(function(){
            planVals.push(this.fixedCost)
        })
        cy.get(this.tCost).invoke('text').as('totalCost').then(function(){
            planVals.push(this.totalCost)
        })
        cy.get(this.drt).invoke('text').as('duration').then(function(){
            planVals.push(this.duration)
        })
        //navigating to the delivery page
        cy.xpath(this.planDelivery).click()

        //extracting and storing in an array and validating delivery values to be equal to featuresPage Values
        cy.get(this.dlv_custCost).invoke('text').as('customizedCost2').then(function(){
            deliveryVals.push(this.customizedCost2)
        })
        cy.get(this.dlv_fCost).invoke('text').as('fixedCost2').then(function(){
            deliveryVals.push(this.fixedCost2)
        })
        cy.get(this.dlv_tCost).invoke('text').as('totalCost2').then(function(){
            deliveryVals.push(this.totalCost2)
        })
        cy.get(this.dlv_drt).invoke('text').as('duration2').then(function(){
            deliveryVals.push(this.duration2)
        }).then(()=>{
            for(let i=0; i < planVals.length; i++){
                expect(planVals[i]).to.deep.equal(deliveryVals[i])
            }
        })
      }

      studioOnePackageValuesAndVerification(){
        cy.xpath(this.studioOne).click()
        var studioCostVals = []
        var paymentCostVals = []
    
        cy.get(this.studioCustCost).invoke('text').as('studioCustomizedCost').then(function(){
            studioCostVals.push(this.studioCustomizedCost.replace(/[^\d\.\-]/g, "").replace("₹", ''))
        })
        cy.get(this.studioFCost).invoke('text').as('studioFixedCost').then(function(){
            studioCostVals.push(this.studioFixedCost.replace(/[^\d\.\-]/g, "").replace("₹", ''))
        })
        cy.get(this.studioCost).invoke('text').as('studioOneCost').then(function(){
            studioCostVals.push(this.studioOneCost.replace(/[^\d\.\-]/g, "").replace("₹", ''))
        })
        cy.get(this.studioTCost).invoke('text').as('studioTotalCost').then(function(){
            studioCostVals.push(this.studioTotalCost.replace(/[^\d\.\-]/g, "").replace("₹", ''))
        })
        cy.get(this.studioDrt).invoke('text').as('studioDuration').then(function(){
            studioCostVals.push(this.studioDuration.replace(/[^\d\.\-]/g, "").replace("weeks", ''))
            studioCostVals.map(Number)
            for(let i=0; i<studioCostVals.length; i++){
                cy.log(studioCostVals[i])
            }
        })
        cy.xpath(this.doneBtn).click()
        //calling card name from json data file
        let cardData 
        cy.fixture('data').then(function(data){
            cardData = data;
        })
       //using window to interact with popup
        cy.window().then(p => {
            cy.get(this.buildCardName).click()
            cy.get(this.buildCardVal).type(cardData.cardName)
            cy.xpath(this.saveBtn).click() 
        })
        cy.get(this.pmtCustCost).invoke('text').as('paymentCustCost').then(function(){
            paymentCostVals.push(this.paymentCustCost.replace(/[^\d\.\-]/g, "").replace("₹", ''))
            paymentCostVals.map(Number)
            //cy.log(paymentCostVals[0])
        })
        cy.get(this.pmtFCost).invoke('text').as('paymentFixedCost').then(function(){
            paymentCostVals.push(this.paymentFixedCost.replace(/[^\d\.\-]/g, "").replace("₹", ''))
        })
        cy.get(this.pmtStudioCost).invoke('text').as('paymentStudioCost').then(function(){
            paymentCostVals.push(this.paymentStudioCost.replace(/[^\d\.\-]/g, "").replace("₹", ''))
        })
        cy.get(this.pmtTCost).invoke('text').as('paymentTotalCost').then(function(){
            paymentCostVals.push(this.paymentTotalCost.replace(/[^\d\.\-]/g, "").replace("₹", ''))
        })
        cy.get(this.pmtDrt).invoke('text').as('paymentDuration').then(function(){
            paymentCostVals.push(this.paymentDuration.replace(/[^\d\.\-]/g, "").replace("Months", ''))
            // paymentCostVals.map(parseFloat)
            // studioCostVals.map(parseFloat)
            for(let i=0; i<paymentCostVals.length -1; i++){
                expect(parseFloat(studioCostVals[i])).to.be.closeTo(parseFloat(paymentCostVals[i]), 1.95)
            }
            expect(parseInt(studioCostVals[4] / 4)).to.deep.equal(parseInt(paymentCostVals[4]))

            
         })

       
      }


      viewPortSize(){
        cy.get('body');
        cy.viewport(window.screen.width, window.screen.height);
      }
}

export default ProjectPomPage