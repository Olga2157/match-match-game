export default class HashCodeService {
  public static hashcode(
    firstName: string,
    lastName: string,
    email: string,
  ): number {
    let hash = 7;
    hash = 31 * hash
      + (firstName == null ? 0 : HashCodeService.hashCodeForString(firstName));
    hash = 31 * hash
      + (lastName == null ? 0 : HashCodeService.hashCodeForString(lastName));
    hash = 31 * hash
      + (email == null ? 0 : HashCodeService.hashCodeForString(email));
    // 7 и 31 are recommended for getting unique hash-code
    return hash;
  }

  // standard formula for hash code in TypeScript
  private static hashCodeForString(field: string) {
    let hash = 0;
    let i;
    let chr;
    if (field.length === 0) return hash;
    for (i = 0; i < field.length; i += 1) {
      chr = field.charCodeAt(i);
      hash = hash * 32 - hash + chr;
    }
    return hash;
  }
}
