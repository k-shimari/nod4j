package data.methodparam;

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

public class AddParam {

	/**
	 *
	 * @param f path + filename e.g., src/main/filename.java
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

			System.out.println("::Arg----");
			List<ParamInfo> paramList = new ArrayList<ParamInfo>();
			for (ParamInfo p : v.methodParams) {
				paramList.add(p);
				System.out.println(f + ": " + p.getMethodName() + ", " + p.getArgumentName() + ", " + p.getType() + ", "
						+ p.getLine());
			}
			System.out.println("----");
			return paramList;
		} catch (IOException e) {
			e.printStackTrace();
			return new ArrayList<ParamInfo>();
		}
	}

	public static class MethodParamVisitor extends Java9BaseVisitor<Void> {

		private ArrayList<String> methodNames = new ArrayList<>();
		private ArrayList<String> methodLines = new ArrayList<>();
		private ArrayList<ParamInfo> methodParams = new ArrayList<ParamInfo>();
		private ArrayList<ParamInfo> methodLastParams = new ArrayList<ParamInfo>();

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
