import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface EvaluationResult {
  'Produkt Typ': string;
}

@Component({
  selector: 'app-dmn-evaluation',
  templateUrl: './dmn-evaluation.component.html',
  styleUrls: ['./dmn-evaluation.component.css']
})
export class DmnEvaluationComponent {
  decisionInputs: { name: string; value: unknown }[] = [
    { name: 'Verwendung', value: '' },
    { name: 'Korperteil', value: '' },
  ];
  isLoading = false;
  // evaluationResult: { name: string; value: unknown }[] = [];
  errorMessage = '';

  evaluationResult: { 'Produkt Typ': string }[] = [];

  constructor(private http: HttpClient) {}

  evaluateDMN() {
    this.isLoading = true;

    const variables: any = {};

    for (const input of this.decisionInputs) {
      variables[input.name] = input.value;
    }

    this.http.post<any>('http://localhost:8080/api/products/dmn/produkt_typ', variables)
      .subscribe(
        (result: EvaluationResult[]) => {
          this.isLoading = false;
          this.evaluationResult = result;
          console.log(result)
          this.errorMessage = '';
        },
        (error) => {
          this.isLoading = false;
          this.evaluationResult = [];
          this.errorMessage = 'An error occurred while evaluating the DMN file.';
        }
      );
  }
}
