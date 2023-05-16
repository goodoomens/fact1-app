import nationalityMapping from "../mappings/nationalityMapping";
import constructorColorMapping from "../mappings/constructorColorMapping";

export default {
  methods: {
    fillZero(pos) {
      return pos < 10 ? `0${pos}` : pos;
    },
    getFlagEmoji(nationality) {
      const countryCode = nationalityMapping[nationality] || "";
      const flagOffset = 127397;

      return countryCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + flagOffset)
        );
    },
    getConstructorImg(constructorId) {
      return require(`@/assets/constructors/${constructorId}.png`);
    },
    getConstructorColor(constructorId) {
      return {
        backgroundColor: `${constructorColorMapping[constructorId]}`,
      };
    },
  },
};
