package builder;

//参考：Builderモデル https://qiita.com/torinist/items/179649f169999d2f4f9a
public abstract class Builder {

	// 文書のタイトルを作る

	public abstract void premakeHead(String head);

	public abstract void postmakeHead();

	public abstract void makeTitle(String title);

	public abstract void makeJavaScript(String js);

	public abstract void makeStyle(String style);

	public abstract void makeText(String text);

	public abstract void makeBody(String title);

	// 文書の本文を作る
	public abstract void preMakeCode(String code);

	public abstract void makeCode(String code);

	public abstract void postMakeCode();

	public abstract void preMakeFooter();

	public abstract void postMakeFooter();

	public abstract void makeScript(String script);

	// 文書作成を完了する
	public abstract void close(String dir);

}