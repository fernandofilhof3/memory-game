import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/card.model';
import { DispositionCard } from '../models/disposition-card.model';

@Pipe({
	name: 'dispositionCards'
})
export class DispositionCardsPipe implements PipeTransform {

	transform(value: Card[][]): any {
		return value.reduce((prev, curr, i) => {
			return prev.concat(curr.map((card, j) => (new DispositionCard({
				...card,
				i, j
			}))));
		}, []);
	}

}
