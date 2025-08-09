import { Component } from '@angular/core';
import { Container } from '../../../../../../../lib/src/lib/components/container/container';
import { Chart1 } from '../chart1/chart1';

@Component({
  selector: 'cdev-dashboard',
  imports: [Container, Chart1],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
