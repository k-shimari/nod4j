package builder;

//参考：Builderモデル https://qiita.com/torinist/items/179649f169999d2f4f9a
public abstract class Builder {

    // 文書のタイトルを作る

	public abstract void makeHead(String head);

	public abstract void makeTitle(String title);

	public abstract void makeJavaScript(String js);

	public abstract void makeStyle(String style);

	public abstract void makeBody(String title) ;
    // 見出しを作る
    public abstract void makeHeading(String heading);

    // 文書の本文を作る
    public abstract void makeContents(String contents);

    public abstract void makeScript(String script);

    // 文書作成を完了する
    public abstract void close(String dir);



}