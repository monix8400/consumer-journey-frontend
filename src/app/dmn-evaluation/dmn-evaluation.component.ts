import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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
      endpoint: 'http://localhost:8080/dmn/immunity_lvl',
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
      endpoint: 'http://localhost:8080/dmn/individual_preference',
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
      endpoint: 'http://localhost:8080/dmn/personalised_choice',
      inputs: [
        {name: 'ImmunityLevel', value: '', options: ["low", "medium", "high"]},
        {
          name: 'ProductType', value: '', options: [
            "HipoAllergenic-Floral Type",
            "HipoAllergenic-Leaves Type",
            "Oilfree-Leave Type",
            "Oilfree-Floral Type",
            "HydroLeaves Type",
            "HydroFloral Type",
            "MattifyingLeaves Type",
            "MattifyingFloral Type"
          ]
        },
      ],
      resultKey: 'Personalised Choice',
      isLoading: false,
      evaluationResult: undefined,
      errorMessage: '',
    },
    {
      title: 'Product Type',
      endpoint: 'http://localhost:8080/dmn/product',
      inputs: [
        {name: 'BodyPart', value: '', options: ["Face", "Lips", "Body"]},
        {
          name: 'PersonalisedChoice', value: '', options: [
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
          ]
        },
      ], resultKey: 'Product', isLoading: false, evaluationResult: undefined, errorMessage: '',
    },
  ];

  evaluationResult: {
    title: string;
    result: string;
  }[] = [];

  previousResults: any = new Map<string, string>();


  constructor(private http: HttpClient, private router: Router) {
  }

  evaluateDecisionTable(table: any) {
    table.isLoading = true;

    const variables: any = {};
    for (const input of table.inputs) {
      variables[input.name] = input.value;
    }

    if (table.endpoint.indexOf("/personalised_choice") > -1) {
      variables["ImmunityLevel"] = this.previousResults.get('Immunity Level');
      variables["ProductType"] = this.previousResults.get('Individual Preference');
    }

    if (table.endpoint.indexOf("/product") > -1) {
      variables["PersonalisedChoice"] = this.previousResults.get('Personalised Choice');
    }

    this.http.post<any>(table.endpoint, variables).subscribe(
      (result: EvaluationResult[]) => {
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
        this.previousResults.set(table.resultKey, result[0][table.resultKey])
      },
      (error) => {
        table.isLoading = false;
        table.evaluationResult = undefined;
        table.errorMessage = 'An error occurred while evaluating the DMN file.';
      }
    );
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

  seeProdukt() {
    console.log(this.previousResults.get('Product'))
    this.router.navigate(['/product-description', this.previousResults.get('Product')])
      .then(r => console.log(r))
  }

}
