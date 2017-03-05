# Open Research Hack Citation Explorer

Hack created as part of [Open Research Data do-a-thon in London](https://www.eventbrite.com/e/open-research-data-do-a-thon-in-london-virtual-tickets-31417371203)

#Basic Idea

Create a plugin for Zotero that has the following functionality:

1. User selects a subset of papers in Zotero
2. Plugin queries different sources for list of cited and cited-by papers (and ideally co-cited)
3. Plugin analyses citation network.
4. Plugin displays the data in a useful way to allow researchers to discover the most relevent literature.

#Data Collection

##Zotero Integration

Zotero has a JavaScript API which should allow us to access the metadata for a selected set of papers:

To get started see here:

* https://www.zotero.org/support/dev/getting_started
* https://www.zotero.org/support/dev/client_coding/javascript_api
* https://www.zotero.org/support/dev/sample_plugin

##Finding DOIs

Zotero may not have DOIs for all the papers selected. There are several ways we could go about finding the DOI based on the metadata we do have. For example:

* https://github.com/torfbolt/DOI-finder

##Finding Cited, Cited-by and Co-cited Lists

This is the tricky bit.

For a small (but hopefully growing) subset of papers we can query the [Open Citation Corpus](http://opencitations.net/).

The [Microsoft Academic Knowledge API](https://www.microsoft.com/cognitive-services/en-us/academic-knowledge-api) may have some data, though it is unclear.

Citation data can be scraped from Google scholar (see [here](https://github.com/lecy/google-scholar-scraper-in-python)). However, there is a limit to the number of queries you can make per second before Google kicks you off.

##Filling in MetaData

Depending on the data source, once we have the list of citing, cited and co-cited dois for each paper we may want to fill in additional metadata such as title, year and abstract. For this the CrossRef and PubMed APIs will work well.  

#Data Analysis 

There are several basic metrics we can define on the network:

* Number of seed papers cited
* Number of seed papers cited-by
* Number of seed papers co-cited with 
* Total times co-cited with a seed paper
* Number of times cited by any papers within the network
* Total citations (as given by Google Scholar / WoS / SCOPUS etc)


#Data Visualisation

At this point we don't know what the most useful way to display the citation network data will be. Here are several ideas to start with.

##View Modes

###List View

Displaying a simple list of papers, ranked by some metric calculated on the network, which indicate what the user should read next. The list should display Title, Author, Year and maybe Abstract on click.

###Timeline View

Publication date provides an intrinsic ordering to papers which is relevant to researchers. Timeline view would displaying papers ordered by time on one axis, and potentially showing citation relations. In this view papers could still be displayed as boxes with readable titles. THe boxes could be colored to indicate the initial seed papers, other papers already in your Zotero library that weren't used as seed papers, and papers which are completely new.

###Network View

Some researchers may be interested in seeing the relevant papers in context as a network view. Again colors can be used to indicate the seed papers, other saved papers, and undiscovered papers. 

To get started with this view, here are a few resources for using JavaScript D3:

* http://mbostock.github.io/d3/talk/20111116/force-collapsible.html

* http://www.coppelia.io/2014/07/an-a-to-z-of-extra-features-for-the-d3-force-layout/

* https://flowingdata.com/2012/08/02/how-to-make-an-interactive-network-visualization/


##Options

In all cases the user should have the ability to filter relevant papers more or less stringently based on the various metrics we define on the network. This could be done with a drop-down to select the metric and a slider to set the threshold for display. We could even have functionality to add additional filters to select based on multiple metrics. 



