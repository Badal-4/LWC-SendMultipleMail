import {LightningElement,api,track} from 'lwc';
import fetchContact from '@salesforce/apex/EmailWithCheckboxController.fetchContact';
import sendemail from '@salesforce/apex/EmailWithCheckboxController.sendemail';
import EmailPreferencesStayInTouchReminder from '@salesforce/schema/User.EmailPreferencesStayInTouchReminder';
export default class conList extends LightningElement 
{
    ListOfContact;
    selectedCount;
    checkboxVal = false;
    @track index;
    @track Values;
    @track SelectedValues = [];
    connectedCallback()
    {
        
      fetchContact({}).then(result => 
        {
            this.ListOfContact = result;
        });
    }
    checkboxSelect(event)
    {
        var selectedRec = event.target.value;
        
        var getSelectedNumber = this.selectedCount;
        if (selectedRec == true) {
            getSelectedNumber++;
        } else {
            getSelectedNumber--;
        }
        this.selectedCount = getSelectedNumber;
    }
    selectAll(event)
    {
        var selectedHeaderCheck = event.target.value;
        var getAllId = this.template.querySelectorAll('[data-id="boxPack"]')
        if(! Array.isArray(getAllId))
        {
            if(selectedHeaderCheck == true)
            {
                this.checkboxVal = true;
                this.selectedCount = 1;
            }
            else 
            {
                 this.checkboxVal = false;
                 this.selectedCount = 0;
            }
        }
        else 
        {
            if (selectedHeaderCheck == true)
            {
                for (var i = 0; i < getAllId.length; i++) 
                {
                    this.checkboxVal[i] = false;
                    this.selectedCount = 0;
                } 
            }
        }
    }
    handleChange(event)
    {
        this.Values = event.target.value;
        //alert(JSON.stringify(getAllId));
        if(event.target.checked)
        {
            this.SelectedValues.push(this.Values);
           
        }
        else 
        {
            try 
            {
                this.index = this.SelectedValues.indexOf( this.Values);
                this.SelectedValues.splice(this.index, 1);
            } catch (err) {
                //error message
            }   
            }
            alert(JSON.stringify(this.SelectedValues));  
        } 
        sendMail(event)
        {
            var ids = [];
            ids = this.SelectedValues;
            sendemail({
              ids : ids
            }).then((result) => 
            {
                alert('Email sent');
            })
        }
    }
    
