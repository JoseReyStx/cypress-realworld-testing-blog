import { format, parseISO } from "date-fns";

export function sortedPosts(posts) {
    return posts.sort(
      (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );
  }

export function getFormatedDate(date, dateFormat) {
    return format(parseISO(date), dateFormat);
}