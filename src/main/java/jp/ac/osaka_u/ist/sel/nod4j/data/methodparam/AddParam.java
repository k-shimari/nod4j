package jp.ac.osaka_u.ist.sel.nod4j.data.methodparam;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;

import antlr4.jp.naist.se.parser.Java9BaseVisitor;
import antlr4.jp.naist.se.parser.Java9Lexer;
import antlr4.jp.naist.se.parser.Java9Parser;
import antlr4.jp.naist.se.parser.Java9Parser.CompilationUnitContext;
import antlr4.jp.naist.se.parser.Java9Parser.FormalParameterContext;
import antlr4.jp.naist.se.parser.Java9Parser.InterfaceMethodDeclarationContext;
import antlr4.jp.naist.se.parser.Java9Parser.LastFormalParameterContext;
import antlr4.jp.naist.se.parser.Java9Parser.MethodDeclarationContext;

/**
 * Get argument values
 * @author k-simari
 *
 */
public class AddParam {
	/**
	 * get method arguments information
	 * @param f path + filename (e.g., src/main/filename.java)
	 */
	public List<ParamInfo> getParamInfo(String f) {
		try {
			// Create a lexer
			CharStream stream = CharStreams.fromFileName(f);
			Java9Lexer lexer = new Java9Lexer(stream);
			CommonTokenStream tokens = new CommonTokenStream(lexer);

			// Run a parser
			Java9Parser parser = new Java9Parser(tokens);
			CompilationUnitContext c = parser.compilationUnit();

			MethodParamVisitor v = new MethodParamVisitor();
			c.accept(v);
			return new ArrayList<>(v.methodParams);
		} catch (IOException e) {
			e.printStackTrace();
			return new ArrayList<>();
		}
	}

	/**
	 * get method argument information
	 * @author k-simari
	 *
	 */
	public static class MethodParamVisitor extends Java9BaseVisitor<Void> {
		private List<String> methodNames = new ArrayList<>();
		private List<String> methodLines = new ArrayList<>();
		private List<ParamInfo> methodParams = new ArrayList<>();
		private List<ParamInfo> methodLastParams = new ArrayList<>();

		@Override
		public Void visitMethodDeclaration(MethodDeclarationContext ctx) {
			methodNames.add(ctx.methodHeader().methodDeclarator().identifier().getText());
			return super.visitMethodDeclaration(ctx);
		}

		@Override
		public Void visitInterfaceMethodDeclaration(InterfaceMethodDeclarationContext ctx) {
			methodNames.add(ctx.methodHeader().methodDeclarator().identifier().getText());
			return super.visitInterfaceMethodDeclaration(ctx);
		}

		@Override
		public Void visitFormalParameter(FormalParameterContext ctx) {
			methodParams.add(new ParamInfo(
					ctx.getParent().getParent().getParent().getStart().getText(),
					ctx.getStop().getText(), ctx.getStart().getText(), ctx.getStop().getLine()));
			return super.visitFormalParameter(ctx);
		}

		@Override
		public Void visitLastFormalParameter(LastFormalParameterContext ctx) {
			return super.visitLastFormalParameter(ctx);
		}
	}
}
