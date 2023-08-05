import { expect } from "chai";
import { PlayfairCipher } from "./PlayfairCipher";

describe("PlayfairCipher test suites", () => {
  const playfairCipher = new PlayfairCipher();

  it("should delete duplicate letter from the array", () => {
    expect(playfairCipher.deleteDuplicateLetter("abcc")).to.eq("abc");
    expect(playfairCipher.deleteDuplicateLetter("aabbcc")).to.eq("abc");
  });

  it("should delete all the letters from the letter list which already inside the key", () => {
    expect(
      playfairCipher.deleteKeyLetterFromArray("a", ["a", "b"]).join("")
    ).to.eq("b");
    expect(
      playfairCipher
        .deleteKeyLetterFromArray("ac", ["a", "b", "c", "d", "e", "f"])
        .join("")
    ).to.eq("bdef");
  });

  it("should split the message into proper pairs", () => {
    expect(
      playfairCipher.splitMessageIntoPair("hello world").flat().join("")
    ).to.eq("HELXLOWORLDX");
  });

  it("check if pair is on the same row", () => {
    expect(
      playfairCipher.isPairOnSameRow(
        ["A", "B"],
        [
          ["A", "B", "C"],
          ["D", "E", "F"],
        ]
      )
    ).to.be.true;
  });

  it("check if pair is on the same col", () => {
    expect(
      playfairCipher.isPairOnSameCol(
        ["A", "D"],
        [
          ["A", "B", "C"],
          ["D", "E", "F"],
        ]
      )
    ).to.be.true;

    expect(
      playfairCipher.isPairOnSameCol(
        ["E", "B"],
        [
          ["A", "B", "C"],
          ["D", "E", "F"],
        ]
      )
    ).to.be.true;

    expect(
      playfairCipher.isPairOnSameCol(
        ["A", "E"],
        [
          ["A", "B", "C"],
          ["D", "E", "F"],
        ]
      )
    ).to.be.false;
  });

  it("should get correct letter position base on letter and letters matrix", () => {
    expect(
      playfairCipher.getLetterPosition("A", [
        ["A", "B", "C"],
        ["D", "E", "F"],
      ])
    ).to.deep.equal([0, 0]);

    expect(
      playfairCipher.getLetterPosition("B", [
        ["A", "B", "C"],
        ["D", "E", "F"],
      ])
    ).to.deep.equal([1, 0]);

    expect(
      playfairCipher.getLetterPosition("E", [
        ["A", "B", "C"],
        ["D", "E", "F"],
      ])
    ).to.deep.equal([1, 1]);
  });

  it("should get mirror letters when pair letters are not on the same row or on the same col", () => {
    expect(
      playfairCipher.getMirrorLetters(
        ["A", "E"],
        [
          ["A", "B", "C"],
          ["D", "E", "F"],
        ]
      )
    ).to.deep.equal(["B", "D"]);

    expect(
      playfairCipher.getMirrorLetters(
        ["A", "F"],
        [
          ["A", "B", "C"],
          ["D", "E", "F"],
        ]
      )
    ).to.deep.equal(["C", "D"]);
  });

  it("should get letter next to it when pair is on the same row or on the same col", () => {
    expect(playfairCipher.getNextLetter("A", ["A", "B", "C"])).to.eql("B");
    expect(playfairCipher.getNextLetter("C", ["A", "B", "C"])).to.eql("A");
  });

  it("should get letter pre to it when pair is on the same row or on the same col", () => {
    expect(playfairCipher.getPreLetter("B", ["A", "B", "C"])).to.eql("A");
    expect(playfairCipher.getPreLetter("A", ["A", "B", "C"])).to.eql("C");
  });

  it("should get the row which the letter belong to", () => {
    expect(
      playfairCipher.getRow("A", [
        ["A", "B", "C"],
        ["D", "E", "F"],
      ])
    ).to.deep.equal(["A", "B", "C"]);
    expect(
      playfairCipher.getRow("E", [
        ["A", "B", "C"],
        ["D", "E", "F"],
      ])
    ).to.deep.equal(["D", "E", "F"]);
  });

  it("should get the column index which the letter belong to that column", () => {
    expect(
      playfairCipher.getColIndex("A", [
        ["A", "B", "C"],
        ["D", "E", "F"],
      ])
    ).to.eql(0);
    expect(
      playfairCipher.getColIndex("E", [
        ["A", "B", "C"],
        ["D", "E", "F"],
      ])
    ).to.eql(1);
  });

  it("should generate correct cipher text base on key", () => {
    expect(
      playfairCipher.encrypt('H', 'A')
    ).to.eql('NC');
  });

  it("should generate correct plain text base on key", () => {
    expect(
      playfairCipher.decrypt('NC', 'A')
    ).to.eql('HX');
  });
});
