#include <fstream>
#include <string>
#include <sstream>

using namespace std;

int main()
{
	const int PAGE_COUNT = 40;
	const string path = "./nav/";

	for (int i = 0; i < PAGE_COUNT; i++)
	{
		int previous = i;
		int current = i + 1;
		int next = current + 1;

		stringstream stringstream;
		stringstream << path << current << ".html";
		ofstream fout(stringstream.str(), ofstream::out);

		stringstream.str("");
		stringstream << "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Faerog Page - ";
		stringstream << current << "</title><style>a:hover,a:active,a:focus{outline:0;border:none;}</style><script src='../../script.js'></script></head>";
		stringstream << "<body style='background:#000'><a id='back' style='display:none' href='";
		stringstream << previous << ".html'></a><div id='content' align='center'><a id='fwd' href='";
		stringstream << next << ".html'><img style='max-width:800px;width:100%;' src='../";
		stringstream << current << ".jpg'/></a></div></body></html>";

		fout << stringstream.str();
		fout.close();
	}
}