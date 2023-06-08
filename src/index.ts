import {main} from '@application/main';

main()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
