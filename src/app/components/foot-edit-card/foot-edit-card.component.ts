import { Menu } from './../../models/menu';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food } from 'src/app/models/food.model';

@Component({
  selector: 'app-foot-edit-card',
  templateUrl: './foot-edit-card.component.html',
  styleUrls: ['./foot-edit-card.component.scss'],
})
export class FootEditCardComponent implements OnInit {
  @Input() item: Menu;

  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit() {}


}
