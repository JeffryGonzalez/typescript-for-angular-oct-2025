export class OtherService {
  constructor(message: string) {
    console.log('Doing some big work here that might take a while...', message);
  }
  doWork() {
    console.log('Other Service Doing Work');
  }
}
