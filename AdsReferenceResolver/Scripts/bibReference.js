var BibliographicReference =
      {
          resultString: "",
          bibCode: "",
          confidence: "",
          reference: "",
          resolved: null,

          Init: function (result)
          {
              BibliographicReference.resultString = result;
              BibliographicReference.bibCode = result.substr(0, 19);
              BibliographicReference.confidence = this.GetConfidence();
              BibliographicReference.reference = this.GetReference();
          },

          GetBibCode: function ()
          {
              return BibliographicReference.bibCode;
          },

          GetConfidence: function ()
          {
              var confidenceStr = BibliographicReference.resultString.substr(20, 14);
              var confidence = confidenceStr.substr(12, 1);

              if (confidence == "0" || confidence == "5")
              {
                  this.resolved = false;
              }
              else if (confidence == "1" || confidence == "2" || confidence == "3" || confidence == "4")
              {
                  this.resolved = true;
              }

              return confidenceStr;
          },

          GetReference: function ()
          {
              return BibliographicReference.resultString.substr(40, BibliographicReference.resultString.length);
          }
      }

document.getElementById('btnSubmit').onclick = function ()
{
    var myInput = document.getElementById('txtCitations');
    var myResult = document.getElementById('lblResult');
    var citations = splitCitation(myInput);

    for (var i = 0; i < citations.length; i++)
    {
        if (citations[i].trim() != "")
        {
            getReference(citations[i]);
        }
    }
}

function getReference(citation)
{
    var url = "http://localhost:60865/api/adsreference?citation=" + encodeURIComponent(citation);

    $.ajax({
        url: url,
        data: encodeURIComponent(citation),
        success: displayResult
    });
}

function displayResult(data)
{
    BibliographicReference.Init(data);
    var result = BibliographicReference.bibCode + " | " + BibliographicReference.confidence + " | " + BibliographicReference.reference + " | " + BibliographicReference.resolved + "\n";

    if (BibliographicReference.resolved === true)
        document.getElementById("pnlResolved").innerText += result;
    else
        document.getElementById("pnlUnresolved").innerText += result;
}

function splitCitation(myInput)
{
    var splitCite = myInput.value.split('\n');
    return splitCite;
}