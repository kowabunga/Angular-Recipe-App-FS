export class RecipeStep {
  title: string;
  directions: string;
  media?: string;
  mediaType?: string;
  timer?: string;
  optional?: string;

  constructor(step) {
    this.title = step.title;
    this.directions = step.directions;
    if (step.media) this.media = step.media;
    if (step.mediaType) this.mediaType = step.mediaType;
    if (step.timer) this.timer = step.timer;
    if (step.optional) this.optional = step.optional;
  }
}
