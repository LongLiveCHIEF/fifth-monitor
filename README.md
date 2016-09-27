[![Stories in Ready](https://badge.waffle.io/LongLiveCHIEF/fifth-monitor.png?label=ready&title=Ready)](https://waffle.io/LongLiveCHIEF/fifth-monitor)
# Destiny Owl Sector ARG

The latest update to [owlsector.bungie.net]() includes a link that proceeds to give you a data transmission.

A very crafty reddit user beat me to the punch, and managed to decrypt the base64 encoded data of some of the messages,
by matching the forwarding protocols to find a full message chunck. (See: [Message Decoded for the new ARG][reddit])

- reddit is currently under the impression that the images are a map
- I believe the images are only part of the message, like a QR code, there is text data embedded in the unprocessed information

## Clues

The clues I describe below have largely been unidentified, missed, or dismissed by the community.
This is partially my fault, as I have been throwing comments at reddit after staying
up for 20 hours straight, and my ramblings seem like nonsense.

I believe detailing the clues in this manner will help to rectify my ramblings,
and together help the community unlock the next step:

## Clues

### Hints gathered from Bungie

- Nodes have names consisting of 4 different UTF-8 characters:
- Each character is actually an 8-bit hex code:
- Each node name, when translated to Hex, is a 32 bit Hex
- 32 bit hex happens to be the base block size factor for Rijndael
 (pronounced Rine-dahl) encryption keys
- Rijndael-AES-CBC is a [symmetric encryption][symmetric] algorithm that uses the same
key to both encrypt and decrypt a message

### Hints of my own

- text can be embedded in images. For an excellent example of this, just take a
photo of this QR code from any QR reader on your mobile device, or upload the QR
code below here: [ZXing Decoder Online](https://zxing.org/w/decode.jspx)
- I've noticed a pattern in the HEX-formatted names of the nodes... many Nodes have the same
32 bit block, even though their names are different
- cyptographic keys contain [randomart images][randomart] used to easily identify various keys by the naked eye

**Example Image with Data embedded (QR code)**  
![QR Code for your owlsector transmission](images/qr_code.jpg)

### Hints from the Reddit user who decrypted the images

reddit user `/r/thegrayfox89` unknowingly (IMHO) gave us a few hints of hist own in his post [Message Decoded for the new ARG][reddit]:

- He mentions that he specifically looked to output JPEG data, and mentioned that there was other data that was either "garbage data", or data in a format he couldn't recognize
- He mentions self-referencing nodes. If this was purely image data, it wouldn't make sense for a base64 decryption of a JPEG to have any matching buffers... especially buffers of such an immense size
- it *does* make sense however, if some of the data within is text, and the message has non-unique words or phrases, or repeating patterns.

## Working Theories

### Theory 1
**The Images Together contain embedded data _(It's a QR code)_**
This theory stipulates that the node names (once translated to hex)and the key sequences used together show you how to assemble the 8 images. On e assembled, the images actually are a QR code.

### Theory 2 - Images are just verification art data still within
This theory is that the images are just verification keys for the message that is embedded in the data. The node names (again translated to hex) are the public keys for the text data, and the images are the private keys. Used together you can decrypt the text contained within. The processing key is either a salt, a filtering mechanism for filtering image data from text data, or is a partial initilization vector that must be pieced together using the forwarding protocol

## Next Steps

Using the info below I've begun to write code to translate node names into hex key's,
using the [google-spreadsheets][] npm package, by consuming the data houseed in [this spreadsheet][spreadsheet]
, which is entered using [this form][entryform]

| Character | Character Name | 8-BIT Hex Code |
| :--------: | :-----------: | :------------: |
| ▼ | [BLACK DOWN POINTING TRIANGLE][] | e296bc |
| ♦ | [BLACK DIAMOND SUIT][] | e299a6 |
| ■ | [BLACK SQUARE][] | e296a0 |
| ● | [BLACK CIRCLE][] | e2978f |


All coders, of any expertise, are welcome to particpate or contribute PR's. To help code, make sure you have latest `npm`, and then:

```
git clone git@github.com:LongLiveCHIEF/fifth-monitor.git
npm install
```

[symmetric]: https://en.wikipedia.org/wiki/Symmetric-key_algorithm
[randomart]: http://askubuntu.com/questions/184547/find-randomart-of-existing-ssh-key
[google-spreadsheets]: https://npmjs.org/packages/google-spreadsheets
[entryform]: https://docs.google.com/forms/d/e/1FAIpQLSfOdQyrQNGm6P9gyGGr1Yfjn9QmCiQ2v5zUCMZJM5-uhQSd6A/viewform?c=0&w=1
[spreadsheet]: https://docs.google.com/spreadsheets/d/1B8KmXWy0_bTpw_52m5r7-yYJxwfTJS1oyqDn5gKn6rk/htmlview?usp=sharing&sle=true
[reddit]: https://www.reddit.com/r/DestinyTheGame/comments/54p2eh/message_decoded_for_the_new_arg/
[BLACK DOWN POINTING TRIANGLE]: http://www.fileformat.info/info/unicode/char/25bc/index.htm
[BLACK DIAMOND SUIT]: http://www.fileformat.info/info/unicode/char/2666/index.htm
[BLACK SQUARE]: http://www.fileformat.info/info/unicode/char/25a0/index.htm
[BLACK CIRCLE]: http://www.fileformat.info/info/unicode/char/25CF/index.htm
