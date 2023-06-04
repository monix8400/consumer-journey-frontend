import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface EvaluationResult {
  title: string;
  result: string;
}

@Component({
  selector: 'app-dmn-evaluation',
  templateUrl: './dmn-evaluation.component.html',
  styleUrls: ['./dmn-evaluation.component.css'],
})
export class DmnEvaluationComponent {
  decisionTables: {
    title: string;
    endpoint: string;
    inputs: { name: string; value: string; options: string[] }[];
    resultKey: string;
    isLoading: boolean;
    evaluationResult?: EvaluationResult;
    errorMessage: string;
  }[] = [
    {
      title: 'Immunity Level',
      endpoint: 'http://localhost:8080/api/products/dmn/immunity_lvl',
      inputs: [
        {name: 'Age', value: '', options: ["Toddler", "Child", "Teenager", "Adult", "Senior"]},
        {name: 'Season', value: '', options: ["Spring", "Summer", "Autumn", "Winter"]},
      ],
      resultKey: 'Immunity Level',
      isLoading: false,
      evaluationResult: undefined,
      errorMessage: '',
    },
    {
      title: 'Individual Preference',
      endpoint: 'http://localhost:8080/api/products/dmn/individual_preference',
      inputs: [
        {name: 'HoneyType', value: '', options: ["BlutenHonig", "Akazienhonig"]},
        {name: 'SkinType', value: '', options: ["allergenic", "oily", "dry", "normal"]},
      ],
      resultKey: 'Individual Preference',
      isLoading: false,
      evaluationResult: undefined,
      errorMessage: '',
    },
    {
      title: 'Personalised Choice',
      endpoint: 'http://localhost:8080/api/products/dmn/personalised_choice',
      inputs: [
        {name: 'ImmunityLevel', value: '', options: ["low", "medium", "high"]},
        {name: 'ProductType', value: '', options: [
          "HipoAllergenic-Floral Type",
            "HipoAllergenic-Leaves Type",
            "Oilfree-Leave Type",
            "Oilfree-Floral Type",
            "HydroLeaves Type",
            "HydroFloral Type",
            "MattifyingLeaves Type",
            "MattifyingFloral Type"
          ]},
      ],
      resultKey: 'Personalised Choice',
      isLoading: false,
      evaluationResult: undefined,
      errorMessage: '',
    },
    {
      title: 'Product Type',
      endpoint: 'http://localhost:8080/api/products/dmn/product',
      inputs: [
        {name: 'BodyPart', value: '', options: ["Face", "Lips"]},
        {name: 'PersonalisedChoice', value: '', options: [
            "HipoAllergenic-Floral Type Extra",
            "HipoAllergenic-Leaves Type Extra",
            "MattifyingLeaves Type Extra",
            "MattifyingFloral Type Extra",
            "HydroFloral Type Extra",
            "HydroLeaves Type Extra",
            "Oilfree-Floral Type Extra",
            "Oilfree-Leave Type Extra",
            "HipoAllergenic-Floral Type Suppliments",
            "HipoAllergenic-Leaves Type Suppliments",
            "MattifyingLeaves Type Suppliments",
            "MattifyingFloral Type Suppliments",
            "HydroFloral Type Suppliments",
            "HydroLeaves Type Suppliments",
            "Oilfree-Floral Type Suppliments",
            "Oilfree-Leave Type Suppliments",
            "HipoAllergenic-Floral Type ImmunityBooster",
            "HipoAllergenic-Leaves Type ImmunityBooster",
            "MattifyingLeaves Type ImmunityBooster",
            "MattifyingFloral Type ImmunityBooster",
            "HydroFloral Type ImmunityBooster",
            "HydroLeaves Type ImmunityBooster",
            "Oilfree-Floral Type ImmunityBooster",
            "Oilfree-Leave Type ImmunityBooster"
          ]},
      ], resultKey: 'Product', isLoading: false, evaluationResult: undefined, errorMessage: '',
    },
  ];

  evaluationResult: {
    title: string;
    result: string;
  }[] = [];

  previousResults: any[] = [];


  constructor(private http: HttpClient) {
  }

  evaluateDecisionTable(table: any) {
    table.isLoading = true;

    const variables: any = {};
    for (const input of table.inputs) {
      variables[input.name] = input.value;
    }

    if (table.endpoint.indexOf("/personalised_choice") > -1) {
      variables["ImmunityLevel"] = this.previousResults[0];
      variables["ProductType"] = this.previousResults[1];
    }

    if (table.endpoint.indexOf("/product") > -1) {
      variables["PersonalisedChoice"] = this.previousResults[2];
    }

    console.log("variables: " + JSON.stringify(variables))

    const values = Object.values(variables);
    const hasEmptyValues = values.some((value: any) => !value);

    if (hasEmptyValues) {

      table.errorMessage = 'You should select something before submitting your preference.';

    } else {

      this.http.post<any>(table.endpoint, variables).subscribe(
        (result: EvaluationResult[]) => {
          console.log(result);
          // @ts-ignore
          console.log(result[0]);

          table.evaluationResult = result.find(res => res.title === table.resultKey);
          if (this.evaluationResult.length === 0) {
            this.evaluationResult.push({title: '', result: ''});
          }
          this.evaluationResult[0].title = table.resultKey
          // @ts-ignore
          this.evaluationResult[0].result = result[0][table.resultKey]
          table.isLoading = false;
          table.evaluationResult = result[0];
          table.errorMessage = '';

          // @ts-ignore
          this.previousResults.push(result[0][table.resultKey]);
        },
        (error) => {
          table.isLoading = false;
          table.evaluationResult = undefined;
          table.errorMessage = 'An error occurred while evaluating the DMN file.';
        }
      );
    }
  }

  getInputOptions(inputName: string): string[] {
    const table = this.decisionTables.find(
      (t) => t.inputs.some(
        (input) => input.name === inputName));

    const input = table?.inputs.find(
      (i) => i.name === inputName);

    return input?.options || [];
  }

  emptyResult() {
    this.evaluationResult = [];
  }
}
