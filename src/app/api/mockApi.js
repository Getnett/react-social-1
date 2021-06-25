import { sampleData } from './sampleData';
import { delay } from '../util/util';
export function fetchSampleData() {
	return delay(1000).then(function () {
		return Promise.resolve(sampleData);
	});
}
